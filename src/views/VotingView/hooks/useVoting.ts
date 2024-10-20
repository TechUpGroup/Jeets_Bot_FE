import { useCallback } from 'react';

import { useAnchorProvider } from '@/hooks/solana/useAnchorProvider';
import { Transaction } from '@solana/web3.js';

export const useVoting = () => {
  const anchorProvider = useAnchorProvider();
  const voting = useCallback(
    async (signatureRaw: string) => {
      if (!anchorProvider) throw new Error('Provider not found');
      const { wallet, connection } = anchorProvider;
      const decodedTx = Buffer.from(signatureRaw, 'base64');
      const transaction = Transaction.from(decodedTx);

      const transactionSigned = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(transactionSigned.serialize(), {
        skipPreflight: true,
        preflightCommitment: 'confirmed',
        maxRetries: 50,
      });
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      const confirmedTx = await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature,
        },
        'confirmed',
      );

      if (!!confirmedTx.value.err) {
        throw new Error('Transaction fail!');
      }
      return signature;
    },
    [anchorProvider],
  );
  return voting;
};
