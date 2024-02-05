import React from 'react'

export const ConnectBtn = ({text}:any) => {
  return (
    <a
    className="inline-flex items-center justify-center px-8 py-4 text-base font-normal text-white transition-all duration-200 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:contrast-150" role="button"
  >
   {text} 
  </a>
  
  )
}
