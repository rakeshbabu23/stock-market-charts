import React, { useState } from "react";

const Selectors = ({ inputValue, selectedPeriod, setSelectedPeriod }) => {
  // const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const periods = ["1D", "1W", "1M", "MAX"];

  return (
    <div className="w-full md:w-[50%] flex flex-row justify-between items-center p-2 rounded-lg">
      {periods.map((period, index) => (
        <div className="w-auto flex-flex-col ">
          <div
            key={index}
            onClick={() => setSelectedPeriod(period)}
            className={`w-auto
            px-4 rounded-md font-medium transition-all duration-200
            ${
              selectedPeriod === period
                ? "bg-white text-blue-700"
                : "text-gray-500 hover:bg-white hover:text-blue-500"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          `}
          >
            {period}
          </div>
          {
            <div
              className={`h-1.5  rounded-t-md ${
                selectedPeriod === period ? "bg-blue-700" : "bg-white"
              }`}
            />
          }
        </div>
      ))}
    </div>
  );
};

export default Selectors;
