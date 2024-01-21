import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  isLoading: boolean;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading, progress }: any) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(progress);
  }, [progress]);

  return (
    <div className="w-full mt-4">
      {isLoading ? (
        <div className="bg-gray-300 h-3 rounded overflow-hidden">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
          ></div>
        </div>
      ) : (
        <div className="bg-gray-300 h-3 rounded overflow-hidden">
          <div
            className=" bg-green-500 h-full"
            style={{ width: `${percent}%`, transition: 'width 1.5s ease' }}
          ></div>
        </div>
      )}
      <div className="mt-5">
       {isLoading ? (
        <div className=" bg-gray-300 h-2 rounded overflow-hidden">
          <div
            className="bg-yellow-400 h-full"
            style={{ width: `${90-progress}%`, transition: 'width 0.5s ease' }}
          ></div>
        </div>
      ) : (
        <div className="bg-gray-300 h-2 rounded overflow-hidden">
          <div
            className=" bg-yellow-400 h-full"
            style={{ width: `${80-percent}%`, transition: 'width 1.5s ease' }}
          ></div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProgressBar;
