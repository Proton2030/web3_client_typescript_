import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const SuccessPage = () => {
  const { address } = useAccount();
  const handleActiveAcount = async () => {
    // alert('Payment Successful! Transaction Hash: ');
    const response = await axios.put(
      `https://webapp.foebezzie.com//api/v1/auth/activeuser/${address}`
    );
    if (response.status === 200) {
      // alert('Account activated');
    } else {
      throw new Error("Server error");
    }
  };

  useEffect(() => {
    handleActiveAcount();
  }, []);

  return (
    <div className="flex  justify-between items-center h-screen w-full">
      <div className="cursor-pointer mx-auto group overflow-hidden p-5 duration-1000 hover:duration-1000 relative w-[30%] h-96 bg-neutral-800 rounded-xl">
        <div className="group-hover:-top-3 bg-transparent -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:top-60 bg-transparent top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:-left-12 bg-transparent top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:-top-44 bg-transparent top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div className="group-hover:left-44 bg-transparent top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div className="group-hover:-left-2 bg-transparent -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div className="group-hover:top-44 bg-transparent top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
        <div className="w-full h-full shadow-xl shadow-neutral-900 p-3 bg-neutral-600 opacity-50 rounded-xl flex-col gap-2 flex justify-center">
          <span className="text-neutral-50 font-bold text-xl italic">
            payment Succesfull
          </span>
          <p className="text-neutral-300">Your account has been activated .</p>
          <Link
            href="/"
            className="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
          >
            Go back
            <div className="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
              Go back
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
