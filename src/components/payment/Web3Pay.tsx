import React, { useState } from 'react';
import Web3 from 'web3';

const PaymentComponent: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handlePay = async () => {
    // Assuming WalletConnect is already connected and available in window.ethereum
    const web3 = new Web3((window as any).ethereum);

    if (!web3) {
      console.error('Web3 not available.');
      return;
    }

    const fromAddress = '0xA1b89bf4F9e6e066E897C94A9f24e0bB7526d4bf';
    const toAddress = '0x278468534C7400F43340eC47B20A20253a5294FB';
    const amountInMatic = '0.01';

    try {
      const nonce = await web3.eth.getTransactionCount(fromAddress);
      const gasPrice = await web3.eth.getGasPrice();

      const privateKey = Buffer.from('0d81ed10232e09d8259e1e83bbee1d87701dba046a9094ce9a49c54a29944e7c', 'hex'); // Convert private key to bytes

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
      <button onClick={handlePay}>
        Pay
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentComponent;
