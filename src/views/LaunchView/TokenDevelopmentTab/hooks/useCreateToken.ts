import { useCallback } from 'react';

import { appConfig } from '@/config';
import tokenIdl from '@/constants/idl/tokenIdl.json';
import { JeetsSolana } from '@/constants/types/token.type';
import { useAnchorProvider } from '@/hooks/solana';
import { BN, Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js';

export const useCreateToken = () => {
  const anchorProvider = useAnchorProvider();
  return useCallback(
    async (params: {
      symbol: string;
      name: string;
      targetScore: number;
      priceSolPerToken: string | number;
      totalSolReceive: string | number;
      maxTokenCanBuy: string | number;
      mint: Keypair;
    }) => {
      const { mint } = params;
      if (!anchorProvider) throw new Error('Provider not found');
      const { wallet, connection, publicKey } = anchorProvider;
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      const program = new Program(tokenIdl as JeetsSolana, anchorProvider);

      const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
      const operator = new PublicKey(appConfig.address.operator);
      const txs = new Transaction();
      txs.recentBlockhash = blockhash;
      txs.feePayer = publicKey;
      const ix = await program.methods
        .createToken(
          params.name, // name token
          params.symbol, // ticker
          '', // uri
          params.targetScore, // target jeets score
        )
        .accounts({
          payer: publicKey,
          operator: operator,
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          mint: mint.publicKey,
        })
        .instruction();
      txs.add(ix);
      const ix2 = await program.methods
        .mint(
          publicKey, // creator pubKey
          new BN(params.priceSolPerToken), // price
          new BN(params.totalSolReceive), // sol target
          new BN(params.maxTokenCanBuy), // max token can buy
        )
        .accounts({
          payer: publicKey,
          operator: operator,
          mint: mint.publicKey,
        })
        .instruction();
      txs.add(ix2);

      const ix3 = await program.methods
        .creatorBuy()
        .accounts({
          buyer: publicKey,
          mint: mint.publicKey,
        })
        .instruction();
      txs.add(ix3);

      txs.partialSign(mint);
      const signedTransaction = await wallet.signTransaction(txs);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: true,
        preflightCommitment: 'confirmed',
        maxRetries: 50,
      });

      const res = await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature,
        },
        'confirmed',
      );
      if (res.value.err) throw new Error('Transaction fail');
      return signature;
      // const signature = await sendAndConfirmTransaction(connection, tx, [mint], {});
      // console.log('mint: ', signature);
    },
    [anchorProvider],
  );
};
