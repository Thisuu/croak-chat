import { useState, useEffect } from "react";
import axios from "axios";
import { useContract, useProvider, useSigner, useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import styles from "../styles/App.module.css";
import TelegramWidget from "../components/TelegramWidget"; // Telegram widgets support
import FloatingImages from "../components/FloatingImages"; // Frogs animation
import { abi, MSG_CONTRACT_ADDRESS } from "../constants/abi";
import { ethers } from "ethers"; // Import ethers for mint fee handling

export default function LoggedIn() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [pair, setPair] = useState({});
  const [ipfsUri, setIpfsUri] = useState("");
  const [showMintBtn, setShowMintBtn] = useState(false);
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { chain } = useNetwork(); // Get the current network and switch function
  const { switchNetwork } = useSwitchNetwork(); // Get switch function

  const messageConversation = useContract({
    addressOrName: MSG_CONTRACT_ADDRESS,
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });

  const getMessage = (e) => setMessage(e.target.value);

  const playCroakSound = () => {
    const audio = new Audio("/sounds/croak-send.mp3");
    audio.play();
  };
  const playHmmSound = () => {
    const audio = new Audio("/sounds/user-send.mp3");
    audio.play();
  };

  const formatText = (text) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
    return formattedText;
  };

  const autoScrollToBottom = () => {
    const chatHistory = document.querySelector("#chatHistory");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please type a message before sending.");
      return;
    }
    try {
      // Clear input field
      document.querySelector("#inputField").value = "";

      // Add user's message to chat history
      const chatHistory = document.querySelector("#chatHistory");
      const messageP = document.createElement("p");
      messageP.className = styles.userMessage; // For styling
      messageP.innerHTML = `<strong>You</strong>:  ${message}`;
      chatHistory.appendChild(messageP);
      
      playHmmSound();

      // Make API request
      const response = await axios.get("https://croakchat-backend.vercel.app/", {
        params: { message },
      });

      if (response.data?.message) {
        const croakResponse = response.data.message.replaceAll("\n", "");

        // Update state
        setResponse(croakResponse);
        setPair({
          message: `<strong>You</strong>:  ${message}`,
          response: `🐸:  ${croakResponse}`,
        });

        // Add formatted Croak's response
        const formattedResponse = formatText(croakResponse);
        const responseP = document.createElement("p");
        responseP.className = styles.croakMessage; // For styling
        responseP.innerHTML = `🐸:  ${formattedResponse}`;
        chatHistory.appendChild(responseP);

        // Play Croak sound
        playCroakSound();

        // Show Mint Chat button
        setShowMintBtn(true);

        // Auto-scroll
        autoScrollToBottom();
      } else {
        console.error("Unexpected response structure:", response);
        alert("Error: Croak response is unavailable.");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
      alert("Error: Failed to send message.");
    } 
    //finally {
    // Reset the message state after sending
   // setMessage("");
 // }
  };

  const mint = async () => {
    try {
      // Check if user is on Linea (59144) and switch if necessary
      if (chain.id !== 59144) {
        try {
          alert("Please switch your network to Linea first.");
          await switchNetwork?.(59144); // Switch to Linea
          return; // Exit minting process if network switch is pending
        } catch (error) {
          console.error("Network switch failed:", error);
          alert("Failed to switch to Linea. Please switch manually.");
          return;
        }
      }
      
      if (!signer) {
      alert("Please connect your wallet to proceed.");
      return;
    }

      const response = await axios.get("https://croakchat-backend.vercel.app/uploadtoipfs", {
        params: { pair },
      });

      if (response.data?.ipfsUrl) {
        setIpfsUri(response.data.ipfsUrl);

        // Set the mint fee (adjust as needed)
        const mintFee = ethers.utils.parseEther("0.00011");
        
        const messageContractWithSigner = messageConversation.connect(signer);

        // Send minting transaction with the IPFS URI and mint fee
        const tx = await messageContractWithSigner.mintNFT(address, response.data.ipfsUrl, {
        value: mintFee, // Include mint fee in the transaction
        gasLimit: 300000, // Set a reasonable gas limit
      });

        // Wait for the transaction to be mined
        await tx.wait();
      alert("You successfully minted the NFT!");
    } else {
      console.error("Error: Invalid IPFS response", response);
      alert("Error: Failed to retrieve IPFS URI.");
    }
  } catch (error) {
    // Handle user rejection
    if (error.code === "ACTION_REJECTED") {
      alert("Transaction was rejected by the user.");
    } else {
      console.error("Error while minting NFT:", error);
      alert("An unexpected error occurred while minting the NFT.");
    }
  }
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    autoScrollToBottom();
  }, [response]);

  return (
    <div className={styles.container}>
    <FloatingImages />
      {/* Background Sound */}
      <audio src="/sounds/background.mp3" autoPlay loop />
      <section className={styles.chat_box}>
        <section className={styles.chat_history} id="chatHistory"></section>
        <section className={styles.message_input}>
          <input
            type="text"
            id="inputField"
            placeholder="Type your message..."
            onChange={getMessage}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </section>
        {showMintBtn && (
          <button className={styles.mint_btn} onClick={mint}>
            MINT CHAT
          </button>
        )}
      </section>
      <section className={styles.telegram_widgets}>
        <TelegramWidget post="CROAK_on_linea/144909" />
        <TelegramWidget post="CROAK_on_linea/144012" />
        <TelegramWidget post="CROAK_on_linea/144482" />
        <TelegramWidget post="CROAK_on_linea/40733" />
      </section>
    </div>
  );
}

