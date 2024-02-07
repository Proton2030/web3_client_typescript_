import React, { useCallback, useEffect, useState } from 'react';
import CountUp from '../sub/countup/CountUp';
import { SliderBtn } from '../sub/slidderBtn/SliderBtn';
import { ActivateAcountBtn } from '../sub/DepayBtn/Dpay';
import axios from 'axios';
import { useAccount } from 'wagmi';

export const Loader = () => {
  const { address } = useAccount();
  const [user, setUser] = useState<any>();


  const [countUpVisible, setCountUpVisible] = useState(false);
  const handleStartMining = async()=>{
    const response = await axios.patch(`https://web-3-be.onrender.com/api/v1/auth/startMining/${address}`)
    if(response.status===200){
      alert("mining started")
    }else{
      alert("mining failed")
    }
   }
  const toggleCountUpVisibility = () => {
      setCountUpVisible(!countUpVisible);
      handleStartMining()
  };


  
  const fetchUserByUserId = useCallback(async () => {
    try {
      if (address) {
      const response = await axios.get(`https://web-3-be.onrender.com/api/v1/auth/getuser-byid/${address}`);
      setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [address]);
  useEffect(() => {
      fetchUserByUserId();
    }, [fetchUserByUserId]);
  
  return (
    <>
      <div className="mx-auto flex justify-center">
      </div>
      <div className="">
        {
          (user?.is_mining) ?
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
