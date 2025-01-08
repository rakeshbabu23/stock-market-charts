import React, { useEffect, useState } from "react";
import { topStocks } from "./data";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [gainerAndLosers, setGainersAndLosers] = useState({
    gainers: [],
    losers: [],
  });
  const getTopLosersAndGainers = async () => {
    try {
      let url =
        "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";
      const response = await fetch(url);
      const info = await response.json();
      const topGainers = info["top_gainers"];
      const topLosers = info["top_losers"];
      setGainersAndLosers({ gainers: topGainers, losers: topLosers });
    } catch (err) {
      alert(err.message);
    }
  };
  // useEffect(() => {
  //   getTopLosersAndGainers();
  // }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        {topStocks.map((stock) => (
          <Card key={stock.symbol}>
            <div
              className="flex items-center space-x-6"
              onClick={() => {
                navigate("/main", {
                  state: {
                    symbol: stock.symbol,
                  },
                });
              }}
            >
              <div className="flex-shrink-0">
                <img
                  src={stock.logo}
                  alt={stock.name}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {stock.name}
                </h2>
                <p className="text-lg font-mono text-blue-600">
                  {stock.symbol}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Market Cap:</span>
                <span className="font-semibold">{stock.marketCap}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Sector:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {stock.sector}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
