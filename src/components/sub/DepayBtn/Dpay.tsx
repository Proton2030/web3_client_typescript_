import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const web3 = new Web3('https://polygon-mainnet.infura.io/v3/070a7032f1d4485d89cd5f0975ffe5e4'); // Replace with your Infura endpoint
const MATIC_TRANSFER_AMOUNT = '0'; // 1 Matic in Wei

type Wallet = {
  address: string;
  balance: number;
};

export const ActivateAcountBtn = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const sender = '0xA1b89bf4F9e6e066E897C94A9f24e0bB7526d4bf';
  const receiver = '0x302010c7068F9E157e119d21C8A3b4B770985861';

  const transferMoney = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice();

      // Convert MATIC_TRANSFER_AMOUNT to BigInt
      const transferAmount = BigInt(MATIC_TRANSFER_AMOUNT);
      
      // Calculate the total cost (gas * gasPrice + transferAmount)
      const totalCost = BigInt(gasPrice) * BigInt(6000000) + transferAmount;

      // Get sender's balance
      const senderBalance = BigInt(await web3.eth.getBalance(sender));

      // Check if the sender has enough funds
      if (senderBalance >= totalCost) {
        const transaction = await web3.eth.sendTransaction({
          from: sender,
          to: receiver,
          value: MATIC_TRANSFER_AMOUNT,
          gasPrice,
        });

        console.log('Transaction Hash:', transaction.transactionHash);

        // Update balances or perform any other necessary actions

        alert('Payment successful!');
      } else {
        alert('Insufficient funds');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      alert(error);
    }
  };
  return (
    <>
<button
          type="button"
          onClick={openModal}
          className="cursor-pointer z-[50] text-sm group relative flex gap-1.5 px-5 py-4
           bg-yellow-400 bg-opacity-80 text-gray-900  rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
        >

          Activate Account
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
                    <a
                    href="https://link.depay.com/4tuqcVjw3naGPs31GL2xc9"
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={transferMoney}
                    >
                      Pay now
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
