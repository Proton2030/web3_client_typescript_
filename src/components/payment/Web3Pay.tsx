import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Web3 from 'web3';

const PaymentComponent = ({amount}:any) => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const { address } = useAccount()
  const handlePay = async () => {
    // Assuming WalletConnect is already connected and available in window.ethereum
    // console.log("=------->clicked");
    if (amount===0 || amount<0) {
      alert("Low Wallet Balance")
    }
    const web3 = new Web3((window as any).ethereum);

    if (!web3) {
      console.error('Web3 not available.');
      return;
    }
   

    const fromAddress = '0x278468534C7400F43340eC47B20A20253a5294FB';
    const toAddress = `${address}`;
    const amountInMatic = amount;

    try {
      const nonce = await web3.eth.getTransactionCount(fromAddress);
      const gasPrice = await web3.eth.getGasPrice();

      const privateKey = Buffer.from('316853909bdb2ec5099f4e447069d4fe9ae977064f14793ebc70fb0672576ca0', 'hex'); // Convert private key to bytes

      const rawTransaction = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(amountInMatic, 'ether'),
        gas: 21000,  
        gasPrice: gasPrice,
        nonce: nonce,
      };

      const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

      setPaymentStatus(`Payment Successful! Transaction Hash: ${receipt.transactionHash}`);
      alert("wowwwwwwwwwww")
    } catch (error) {
      console.error('Transaction Error:', error);
      setPaymentStatus(`Payment Failed. Error: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={()=>alert(" Wallet Balance Low")}  className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white">
        Claim</button>
    </div>
  );
};

export default PaymentComponent;
