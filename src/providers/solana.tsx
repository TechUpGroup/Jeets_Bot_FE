'use client';

import '@solana/wallet-adapter-react-ui/styles.css';

import React, { useMemo } from 'react';

import { appConfig } from '@/config';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

export default function SolanaProvider({ children }: React.PropsWithChildren) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = appConfig.isSolanaMainnet
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
