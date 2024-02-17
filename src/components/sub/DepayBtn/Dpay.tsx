import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';

const ActivateAccountBtn: React.FC<{ context: string }> = ({ context }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const handlePay = async () => {
    setLoading(true);

    try {
      // Check if ethereum is available
      if (!window.ethereum) {
        throw new Error('Mobile wallet not detected');
      }

      // Request access to accounts
      const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' });

      // Get current user's account
      const fromAddress = accounts[0]; // Assuming the first account is used

      // Receiver's address (Replace with the recipient's address)
      const toAddress = '0x278468534C7400F43340eC47B20A20253a5294FB';

      // Calculate 1 Matic in Wei
      const amountInMatic = 1;
      const maticDecimals = 18;
      const amountInWei = amountInMatic * Math.pow(10, maticDecimals);

      // Send transaction using ethereum.request
      const txHash = await (window.ethereum as any).request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: toAddress,
            value: `0x${amountInWei.toString(16)}`, // Convert to hex
          },
        ],
      });

      // Transaction successful, handle the response
      alert('Payment Successful! Transaction Hash: ' + txHash);
      const response = await axios.put(`https://web-3-be.onrender.com/api/v1/auth/activeuser/${address}`);
      if (response.status === 200) {
        alert('Account activated');
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert(`Payment Failed. Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
    <button
      onClick={handlePay}
      disabled={loading}
      className="-mt-20  hidden md:inline hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
    >
      {loading ? 'Processing...' : context}
    </button>

    {/* //for mobile vision */}
    <Link
      href="https://pay.radom.network/pay/f0b93462-2ae9-4c90-a375-720785d53951"
      className="-mt-72 inline md:hidden hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
    >
      {loading ? 'Processing...' : context}
    </Link>
     </>
  );
};

export default ActivateAccountBtn;
