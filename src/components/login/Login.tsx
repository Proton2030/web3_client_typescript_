import { useWeb3Modal } from '@web3modal/wagmi/react'
import React from 'react'

export const Login = () => {
    const { open, close } = useWeb3Modal()
  return (
    <>
    <div
  className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
>
  <h2 className="text-2xl font-bold text-white mb-6">Connect your wallet</h2>

  <form method="post" action="#">

   

    

    <div className="flex justify-center">
      <button
        className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-6 py-3 font-bold rounded-full hover:opacity-80"
        type="submit"
        onClick={() => open()}
      >
        Connect 
      </button>
    </div>
  </form>
</div>

    </>
  )
}
