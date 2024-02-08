import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
    // arbitrum,
    // avalanche,
    // bsc,
    // fantom,
    // gnosis,
    // mainnet,
    // optimism,
    polygon,
} from "wagmi/chains";

const chains = [
    // mainnet,
    polygon,
    // avalanche,
    // arbitrum,
    // bsc,
    // optimism,
    // gnosis,
    // fantom,
];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
    name: "Next Starter Template",
    description: "A Next.js starter template with Web3Modal v3 + Wagmi",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

function App({ Component, pageProps }: AppProps) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);

        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                }).catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
            });
        }
    }, []);

    return (
        <>
            {ready ? (
                <WagmiConfig config={wagmiConfig}>
                    <Component {...pageProps} />
                </WagmiConfig>
            ) : null}
        </>
    );
}

export default App;
