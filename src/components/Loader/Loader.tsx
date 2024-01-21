import React from 'react'
import CountUp from '../sub/countup/CountUp'

export const Loader = () => {
  return (
    <>
    <div className="mx-auto flex justify-center ">
        <div className="text-xl font-semibold text-white">Cloud Boost</div>
    </div>
    <div className="">
        <CountUp/>
    </div>
 </>
  )
}
