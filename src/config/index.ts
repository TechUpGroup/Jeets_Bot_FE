export const appConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  publicUrl: process.env.NEXT_PUBLIC_URL,
  publicUrlV2: process.env.NEXT_PUBLIC_URL_V2,
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1),

  isSolanaMainnet: process.env.NEXT_PUBLIC_IS_SOLANA_MAINNET?.trim().toLowerCase() === 'true',

  social: {
    twitter: '#',
    discord: '#',
  },

  address: {
    operator: process.env.NEXT_PUBLIC_OPERATOR_ADDRESS ?? '',
  },
};
