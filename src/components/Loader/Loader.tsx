import React, { useState } from 'react';
import CountUp from '../sub/countup/CountUp';
import { SliderBtn } from '../sub/slidderBtn/SliderBtn';
import { ActivateAcountBtn } from '../sub/DepayBtn/Dpay';
import axios from 'axios';
import { useAccount } from 'wagmi';

export const Loader = () => {
  const { address } = useAccount();

  const [countUpVisible, setCountUpVisible] = useState(false);
  const handleStartMining = async()=>{
    const response = await axios.put(`https://web3-0ujz.onrender.com/auth/startMining/${address}`)
    if(response.status===200){
      alert("mining started")
    }
   }
  const toggleCountUpVisibility = () => {
      setCountUpVisible(!countUpVisible);
      handleStartMining()
  };

  return (
    <>
      <div className="mx-auto flex justify-center">
      </div>
      <div className="">
        {
          (countUpVisible) ?
            <>
              <CountUp />
            </>
            :
            <>
              <div className="w-72 h-32 mx-auto flex justify-center">

                <div className='flex justify-center mt-5'>
                  <label htmlFor="toggle" className="toggle-label">
                    <input
                    
                      className="circle"
                      id="toggle"
                      name="toggle"
                      type="checkbox"
                      checked={countUpVisible}
                      onChange={toggleCountUpVisibility}
                    />
                  </label>
                </div>
              </div>
            </>
        }

      </div>
    </>
  );
};
