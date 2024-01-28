import React, { useState } from 'react';
import CountUp from '../sub/countup/CountUp';
import { SliderBtn } from '../sub/slidderBtn/SliderBtn';

export const Loader = () => {
  const [countUpVisible, setCountUpVisible] = useState(false);

  const toggleCountUpVisibility = () => {
    setCountUpVisible(!countUpVisible);
  };

  return (
    <>
      <div className="mx-auto flex justify-center">
      </div>
      <div className="">
        {
          (countUpVisible)?
          <CountUp />
          :
<div className="w-72 h-32 "></div>
        }
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
  );
};
