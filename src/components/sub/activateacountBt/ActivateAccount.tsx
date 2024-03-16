import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useAccount } from "wagmi";
import qr from "../../../../public/qr.png";
import Image from "next/image";

const ActivateAccountBtn: React.FC<{ context: string }> = ({ context }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const [transactionHash, setTransactionHash] = useState<string>("");
  let [isOpen, setIsOpen] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false); // State to track if address is copied

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x278468534C7400F43340eC47B20A20253a5294FB"); // Copy address to clipboard
    setIsAddressCopied(true); // Set the state to indicate successful copy
  };
  const handlePay = async () => {
    setLoading(true);

    try {
      // Check if ethereum is available
      if (!window.ethereum) {
        throw new Error("Mobile wallet not detected");
      }

      // Request access to accounts
      const accounts = await (window.ethereum as any).request({
        method: "eth_requestAccounts",
      });

      // Get current user's account
      const fromAddress = accounts[0]; // Assuming the first account is used

      // Receiver's address (Replace with the recipient's address)
      const toAddress = "0x278468534C7400F43340eC47B20A20253a5294FB";

      // Calculate 1 Matic in Wei
      const amountInMatic = 1;
      const maticDecimals = 18;
      const amountInWei = amountInMatic * Math.pow(10, maticDecimals);

      // Send transaction using ethereum.request
      const txHash = await (window.ethereum as any).request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: toAddress,
            value: `0x${amountInWei.toString(16)}`, // Convert to hex
          },
        ],
      });

      // Transaction successful, handle the response
      alert("Payment Successful! Transaction Hash: " + txHash);
      const response = await axios.put(
        `https://d1sc3hq7fqk6dl.cloudfront.net/api/v1/auth/activeuser/${address}/${txHash}`
      );
      if (response.status === 200) {
        alert("Account activated");
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Payment Failed. Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://d1sc3hq7fqk6dl.cloudfront.net/api/v1/payment/reqpayment",
        {
          user_id: address, // Implement a function to get user_id
          hash_id: transactionHash,
          is_payed: false, // Assuming initially payment is not done
        }
      );
      console.log(response.data); // Handle response accordingly
      closeModal();
    } catch (error) {
      console.error("Error submitting transaction hash:", error);
      // Handle error
    }
  };

  return (
    <>
      <button
        onClick={handlePay}
        disabled={loading}
        className="-mt-20  hidden md:inline hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
      >
        {loading ? "Processing..." : context}
      </button>

      {/* //for mobile vision */}
      <button
        onClick={openModal}
        // href="https://pay.radom.network/pay/3b4ddb91-31be-4fe7-873d-1712cdb4ea6e"
        className="-mt-72 inline md:hidden hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
      >
        {loading ? "Processing..." : context}
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
                <Dialog.Panel className="w-full mx-auto max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Acount Activation Request for 1 Matic
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex flex-col justify-start  items-center text-xm text-gray-800">
                      <button
                        onClick={handleCopyAddress}
                        className="cursor-pointer bg-gray-200 rounded-lg px-4 py-2"
                      >
                        {isAddressCopied ? "Copied" : "Copy"}
                      </button>
                      <div className="text-xs">
                        0x278468534C7400F43340eC47B20A20253a5294FB
                      </div>
                    </div>
                    <Image
                      width={250}
                      height={250}
                      alt="qr"
                      src={qr}
                      className="mx-auto"
                    />{" "}
                    {/* Replace path_to_your_image with actual image path */}
                    <div className="flex justify-center flex-col">
                      <label className="text-black mx-auto text-sm">
                        Transcation Hash:
                      </label>
                      <input
                        type="text"
                        value={transactionHash}
                        onChange={(e) => setTransactionHash(e.target.value)}
                        placeholder="Enter transaction hash"
                        className="text-black mx-auto bg-gray-100 px-5 py-3 rounded-lg shadow-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 text-gray-100 px-7 py-3"
                      onClick={handleSubmit}
                    >
                      Submit
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

export default ActivateAccountBtn;
