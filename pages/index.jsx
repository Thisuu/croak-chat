import React from 'react';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect, useNetwork } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
  
export default function HomePage() {

  const { connectAsync } = useConnect();

  const { disconnectAsync } = useDisconnect();

  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();
  
  // Linea chain ID
//  const LINEA_CHAIN_ID = 59144; // 59141 for LineaSepolia
  
  const { chain, switchNetworkAsync } = useNetwork();

  const handleAuth = async () => {
  try {
    if (isConnected) {
      await disconnectAsync();

    }

    // Use a supported chainId for authentication (e.g., Ethereum Mainnet: 1)
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });


    if (chain.id !== 1) { // Switch to Ethereum Mainnet
      await switchNetworkAsync?.(1);
    }


    const { message } = await requestChallengeAsync({
      address: account,
      chainId: 1, // Use Ethereum Mainnet for Moralis authentication

    });

    const signature = await signMessageAsync({ message });

    // Redirect user after successful authentication
    const { url } = await signIn("moralis-auth", {
      message,
      signature,

      redirect: false,
      callbackUrl: "/user",
    });
    push(url);
  } catch (error) {
    if (error.name === "UserRejectedRequestError") { //Specific error handling for 1st login attempt
      console.warn("User rejected the request.");
      alert("You canceled the request. Please try again.");
    } else {
      console.error("Authentication failed:", error);
      alert("Failed to authenticate. Please check your wallet and try again.");
    }
  }

};

  return (
    <div className={styles.homepage}>

      {/* Landscape */}
      <div className={styles.landscape}>
      {/* Intro Content */}
        <div className={styles.textContent}>
          <p className={styles.introText}>
            Hear that, mate?<br />The gentle symphony of Croaks, the (e)Frogs of Linea calling. Let the rhythm of the pond soothe your soul...
            <br />
            or take the leap and enter the pond.
          </p>
          <button className={styles.enterPondButton} onClick={handleAuth}>
          Enter the Pond
        </button>
        <p className={styles.footer}>
            Built with 💛 on LINEA
          </p>
          <audio src="/sounds/background.mp3" autoPlay loop volume="0.5" />
        </div>
        
      {/* Mountains */}
      <div className={styles.mountain}></div>
      <div className={`${styles.mountain} ${styles['mountain-2']}`}></div>
      <div className={`${styles.mountain} ${styles['mountain-3']}`}></div>

      {/* Sun */}
      <div className={`${styles['sun-container']} ${styles['sun-container-1']}`}></div>
      <div className={styles['sun-container']}>
        <div className={styles.sun}></div>
      </div>

      {/* Clouds */}
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>

      {/* Sun Reflection */}
      <div className={`${styles['sun-container']} ${styles['sun-container-reflection']}`}>
        <div className={styles.sun}></div>
      </div>

      {/* Light */}
      <div className={styles.light}></div>
      <div className={`${styles.light} ${styles['light-1']}`}></div>
      <div className={`${styles.light} ${styles['light-2']}`}></div>
      <div className={`${styles.light} ${styles['light-3']}`}></div>
      <div className={`${styles.light} ${styles['light-4']}`}></div>
      <div className={`${styles.light} ${styles['light-5']}`}></div>
      <div className={`${styles.light} ${styles['light-6']}`}></div>
      <div className={`${styles.light} ${styles['light-7']}`}></div>

      {/* Water */}
      <div className={styles.water}></div>

      {/* Splash */}
      <div className={styles.splash}></div>
      <div className={`${styles.splash} ${styles['delay-1']}`}></div>
      <div className={`${styles.splash} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-5']}`}></div>

      {/* Lotus */}
      <div className={`${styles.lotus} ${styles['lotus-1']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-2']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-3']}`}></div>

      {/* Front */}
      <div className={styles.front}>
        <div className={styles.stone}></div>
        <div className={styles.grass}></div>
        <div className={`${styles.grass} ${styles['grass-1']}`}></div>
        <div className={`${styles.grass} ${styles['grass-2']}`}></div>
        <div className={styles.reed}></div>
        <div className={`${styles.reed} ${styles['reed-1']}`}></div>
      </div>
    </div>
    </div>
  );
}

