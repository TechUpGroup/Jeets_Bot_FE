'use client';

import '@tiplink/wallet-adapter-react-ui/styles.css';

import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { appConfig } from '@/config';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { TipLinkWalletAdapter } from '@tiplink/wallet-adapter';
import { TipLinkWalletAutoConnectV2, WalletModalProvider } from '@tiplink/wallet-adapter-react-ui';

export default function SolanaProvider({ children }: React.PropsWithChildren) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = appConfig.isSolanaMainnet ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const searchParams = useSearchParams();
  const wallets = useMemo(
    () => [
      // new PhantomWalletAdapter()
      new TipLinkWalletAdapter({
        title: 'SolJeets Bot',
        clientId: '694bf97c-d2ac-4dfc-a786-a001812658df',
        theme: 'light',
      }),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <TipLinkWalletAutoConnectV2 isReady query={searchParams}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </TipLinkWalletAutoConnectV2>
      </WalletProvider>
    </ConnectionProvider>
  );
}
