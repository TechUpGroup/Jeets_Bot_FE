import { useCallback } from 'react';

import tokenIdl from '@/constants/idl/tokenIdl.json';
import { JeetsSolana } from '@/constants/types/token.type';
import { useAnchorProvider } from '@/hooks/solana';
import { BN, Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey, sendAndConfirmTransaction, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js';

export const useCreateToken = () => {
  const anchorProvider = useAnchorProvider();
  return useCallback(
    async (params: {
      symbol: string;
      name: string;
      target_score: number;
      maxHolding?: bigint;
      nonce: string;
      price: bigint;
    }) => {
      if (!anchorProvider) throw new Error('Provider not found');
      const { wallet, connection, publicKey } = anchorProvider;
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      const program = new Program(tokenIdl as JeetsSolana, anchorProvider);
      const mint = Keypair.generate(); // tạo địa chỉ token

      const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
      const operator = new PublicKey('DydnchyFBgyXYfVi4gmwPKFGxdL8eoXfpG1UaoVhsHrV');
      const tx = new Transaction();
      const ix = await program.methods
        .createToken(
          params.name, // name token
          params.symbol, // ticker
          '', // uri
          params.target_score, // target jeets score
        )
        .accounts({
          payer: publicKey,
          operator: operator,
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          mint: mint.publicKey,
        })
        .instruction();
      tx.add(ix);
      const ix2 = await program.methods
        .mint(
          publicKey, // creator pubKey
          new BN(5000000), // price
          new BN(500000), // sol target
          new BN(40000000 * 10 ** 6), // max token can buy
        )
        .accounts({
          payer: publicKey,
          operator: operator,
          mint: mint.publicKey,
        })
        .instruction();
      tx.add(ix2);
      tx.partialSign(mint);
      const signedTransaction = await wallet.signTransaction(tx);
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
