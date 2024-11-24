import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'; // Import global styles,important
const Moralis = require("moralis").default;

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
});

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
            </SessionProvider>
        </WagmiConfig>
    );
}

export default MyApp;

