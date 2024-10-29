import { useCallback } from 'react';

import tokenIdl from '@/constants/idl/tokenIdl.json';
import { JeetsSolana } from '@/constants/types/token.type';
import { useAnchorProvider } from '@/hooks/solana';
import { BN, Program } from '@coral-xyz/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';

export const useSellToken = () => {
  const anchorProvider = useAnchorProvider();
  return useCallback(
    async (params: { amountToken: string; mint: string }) => {
      if (!anchorProvider) throw new Error('Provider not found');
      const { wallet, connection, publicKey } = anchorProvider;
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      const program = new Program(tokenIdl as JeetsSolana, anchorProvider);

      const txs = new Transaction();
      txs.recentBlockhash = blockhash;
      txs.feePayer = publicKey;
      const ix = await program.methods
        .sell(new BN(params.amountToken))
        .accounts({
          seller: publicKey,
          mint: new PublicKey(params.mint),
        })
        .instruction();
      txs.add(ix);
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
    },
    [anchorProvider],
  );
};
