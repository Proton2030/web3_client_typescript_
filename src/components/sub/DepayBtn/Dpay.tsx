import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useAccount } from 'wagmi';
import Web3 from 'web3';

export const ActivateAcountBtn = ({context}:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState('');

  const { address } = useAccount();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handlePay = async () => {
    if (!privateKey) {
      alert('Please enter your private key.');
      return;
    }

    const web3 = new Web3((window as any).ethereum);

    if (!web3) {
      console.error('Web3 not available.');
      return;
    }

    const fromAddress = `${address}`;
    const toAddress = '0xA1b89bf4F9e6e066E897C94A9f24e0bB7526d4bf';
    const amountInMatic = '1';

    try {
      const nonce = await web3.eth.getTransactionCount(fromAddress);
      const gasPrice = await web3.eth.getGasPrice();

      const privateKeyBuffer = Buffer.from(privateKey, 'hex');

      const rawTransaction = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(amountInMatic, 'ether'),
        gas: 21000,
        gasPrice: gasPrice,
        nonce: nonce,
      };

      const signedTransaction = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKeyBuffer
      );

      const receipt = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );

      alert(`Payment Successful! Transaction Hash: ${receipt.transactionHash}`);
      const response = await axios.put(`https://web-3-be.onrender.com/api/v1/auth/activeuser/${address}`)
      if(response.status===200){
        alert("account activated")
        closeModal();
      }else{
        alert("Server error")
        closeModal();
      }
      
    } catch (error) {
      console.error('Transaction Error:', error);
      alert(`Payment Failed. Error: ${error}`);
    }
  };

  return (
    <>
   <button onClick={openModal} className="-mt-20 hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white">{context}</button>

     
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Activate your account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                     Enter your privet key from your wallet to perform secure payment
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <input
                      type="text"
                      placeholder="Enter Private Key"
                      className="p-2 border border-gray-500 rounded"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                    />
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-2"
                      onClick={handlePay}
                    >
                      Pay now
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
