import React from "react";

const Down = () => {
  return (
    <>
      <div className="gearbox">
        <div className="overlay"></div>
        <div className="gear one">
          <div className="gear-inner">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        <div className="gear two">
          <div className="gear-inner">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        <div className="gear three">
          <div className="gear-inner">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        <div className="gear four large">
          <div className="gear-inner">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div
        className="glitch mt-56"
        data-text=" App   service is down due to missed maintenance ..."
      >
        App service is down due to missed maintenance ...
      </div>
    </>
  );
};

export default Down;
