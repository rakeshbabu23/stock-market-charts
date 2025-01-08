import React from "react";
//ZT8HJOH556RA5BOT
const Card = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="pointer bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
