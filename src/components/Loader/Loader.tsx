import React, { useState } from 'react';
import CountUp from '../sub/countup/CountUp';
import { SliderBtn } from '../sub/slidderBtn/SliderBtn';
import { Dpay } from '../sub/DepayBtn/Dpay';

export const Loader = () => {
  const [countUpVisible, setCountUpVisible] = useState(false);
  const toggleCountUpVisibility = () => {
    setTimeout(() => {
      setCountUpVisible(!countUpVisible);
    }, 2000);
  };

  return (
    <>
      <div className="mx-auto flex justify-center">
      </div>
      <div className="">
        {
          (countUpVisible)?
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
<div className="flex justify-center">
<Dpay/>         

</div>
          </>

        }
      
      </div>
    </>
  );
};
