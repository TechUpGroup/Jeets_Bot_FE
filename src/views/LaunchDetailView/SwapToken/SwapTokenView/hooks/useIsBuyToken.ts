import tokenIdl from '@/constants/idl/tokenIdl.json';
import { JeetsSolana } from '@/constants/types/token.type';
import { useAnchorProvider } from '@/hooks/solana';
import { useBaseQuery } from '@/hooks/useBaseQuery';
import { Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export const useIsBuyToken = (mint: string) => {
  const anchorProvider = useAnchorProvider();

  return useBaseQuery({
    queryKey: ['checkIsBuyToken', mint],
    queryFn: async () => {
      if (!anchorProvider) return;
      const program = new Program(tokenIdl as JeetsSolana, anchorProvider);
      const { connection, publicKey } = anchorProvider;
      const pda = PublicKey.findProgramAddressSync(
        [Buffer.from('pda_buyer'), publicKey.toBuffer(), new PublicKey(mint).toBuffer()],
        program.programId,
      )[0];
      const data = await connection.getAccountInfo(pda);
      if (!data || data.lamports == 0) return false;
      return true;
    },
    enabled: !!anchorProvider,
  });
};
