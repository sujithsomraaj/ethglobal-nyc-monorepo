import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  polygonMumbai,
  arbitrumGoerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Link from 'next/link';
import Head from 'next/head';

const { chains, publicClient } = configureChains(
  [goerli, polygonMumbai, arbitrumGoerli],
  [
    alchemyProvider({ apiKey: "s-sEaMiC8rHW7Tab8CTs3GWYX0vDKUhz"}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CAPITAL EPSILON',
  projectId: '67e2178760e215e45d28c9a32d5efb87',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }) {
  return(
    <>
    <Head>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
       <link
          href="https://fonts.googleapis.com/css2?family=Inclusive+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          />
    </Head>
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>  
        <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
   )
}
