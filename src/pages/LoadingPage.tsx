import React, { useEffect } from "react";

const LoadingPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="h-screen bg-white d-flex justify-center items-center">
        <div className=" m-auto h-16 w-16 rounded-xl bg-white absolute top-[45%] left-[45%]">
          <svg className="svg" viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
        <p className="text-lg text-black absolute top-[55%] left-[25%]">
          Redirecting to playstore
        </p>
      </div>
    </>
  );
};

export default LoadingPage;
