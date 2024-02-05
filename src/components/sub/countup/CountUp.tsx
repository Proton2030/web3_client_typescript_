import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar/ProgressBar';

const CountUp: React.FC = () => {
  const [is_active, setIs_active] = useState(false);

  const getRandomNumber = () => {
    if (!is_active) {
      return Math.floor(Math.random() * 21) + 300; // Random number between 300 and 320
    } else {
      return Math.floor(Math.random() * 91) + 900; // Random number between 900 and 990
    }
  };

  
  const getRandomDifference = () => {
    return !is_active ? Math.floor(Math.random() * 21) : Math.floor(Math.random() * 91);
  };
  const [currentNumber, setCurrentNumber] = useState(getRandomNumber());
  const [nextNumber, setNextNumber] = useState(getRandomNumber());
  const [difference, setDifference] = useState(getRandomDifference());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber(nextNumber);
      setNextNumber(getRandomNumber());
      setDifference(getRandomDifference());
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        // Do not reset progress after each cycle
      }, 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, [nextNumber]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
    }, 20);

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  const progressValue = (currentNumber - 100) / (999 - 100) * 100;

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-2xl font-bold mb-4 flex items-center">
        {currentNumber}&nbsp;
        <img className='h-7 w-7' src="https://img.icons8.com/?size=96&id=Fd6rQtBe40c5&format=png" alt="" />
        H/s
      </div>
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>  
      </div> 
      <ProgressBar isLoading={isLoading} progress={ progressValue} />
    </div>
  );
};

export default CountUp;
