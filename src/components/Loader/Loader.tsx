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

  const handleStartMining = async () => {
    const response = await axios.patch(`https://web-3-be.onrender.com/api/v1/auth/startMining/${address}`);
    if (response.status === 200) {
      // Assuming the user is now mining
      setUser(response.data.data);
    } else {
      alert("Mining failed");
    }
  };

  const toggleCountUpVisibility = () => {
    // Check if user is mining or countUpVisible is already true
    if (user?.user?.is_mining || countUpVisible) {
      setCountUpVisible(true);
    } else {
      setCountUpVisible(!countUpVisible);
      handleStartMining(); // Start mining when toggling visibility
    }
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
        {countUpVisible || (user?.user?.is_mining && <CountUp is_active={user?.is_active} />) ? (
          <CountUp is_active={user?.is_active} />
        ) : (
          <> {
!user?.is_mining ?  <div className="w-72 h-32 mx-auto flex justify-center">
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
</div> : <CountUp is_active={user?.is_active} />
          }
          </>
         
         
        )}
      </div>
    </>
  );
};
