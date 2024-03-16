import axios from "axios";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";

const PaymentComponent = ({ balance }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const handlePay = async () => {
    setLoading(true);

    try {
      // Check if window.ethereum is available
      if (!window.ethereum) {
        throw new Error("Wallet provider not detected");
      }

      // Create Web3 instance with the RPC endpoint for Polygon (Matic) network
      const web3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
      );

      // Enable the provider (WalletConnect or other provider)
      await (window as any).ethereum.send("eth_requestAccounts");

      // Get current user's account
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0]; // Assuming the first account is used

      // Receiver's address (Replace with the recipient's address)
      const toAddress = "0x278468534C7400F43340eC47B20A20253a5294FB";

      // Calculate 1 Matic in Wei
      const amountInMatic = balance;
      const maticDecimals = 18;
      const amountInWei = amountInMatic * Math.pow(10, maticDecimals);

      // Send transaction using ethereum.sendAsync
      (window as any).ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            {
              from: toAddress,
              to: address,
              value: `0x${amountInWei.toString(16)}`, // Convert to hex
            },
          ],
          id: 1, // Request ID
        },
        async (err: any, result: any) => {
          if (err) {
            console.error("Payment Error:", err);
            alert(`Payment Failed. Error: ${err.message}`);
          } else {
            // Transaction successful, handle the response
            alert("Payment Successful! Transaction Hash: " + result.result);
            const response = await axios.put(
              `https://d1sc3hq7fqk6dl.cloudfront.net/api/v1/auth/activeuser/${address}`
            );
            if (response.status === 200) {
              alert("account activated");
              // closeModal();
            } else {
              alert("Server error");
              // closeModal();
            }
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Payment Failed. Error: ${error}`);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className=" hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
    >
      {loading ? "Processing..." : "claim"}
    </button>
  );
};

export default PaymentComponent;
