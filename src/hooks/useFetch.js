import { useEffect, useState } from "react";

const options = {
  "1D": {
    func: "TIME_SERIES_INTRADAY",
    interval: "5min",
  },
  "1W": {
    func: "TIME_SERIES_DAILY",
    outputsize: "compact",
  },
  "1M": {
    func: "TIME_SERIES_DAILY",
    outputsize: "compact",
  },
  MAX: {
    func: "TIME_SERIES_MONTHLY",
    outputsize: "full",
  },
};

export const useFetch = (inputValue) => {
  const [stockData, setStockData] = useState({
    labels: [],
    data: [],
  });
  const [selectedPeriod, setSelectedPeriod] = useState("1D");

  useEffect(() => {
    getStockData();
  }, [selectedPeriod, inputValue]);

  async function getStockData() {
    try {
      if (!inputValue) {
        setStockData({
          labels: [],
          data: [],
        });
        return;
      }
      const periodOptions = options[selectedPeriod];
      let queryUrl = `https://www.alphavantage.co/query?function=${periodOptions.func}&symbol=${inputValue}&apikey=JC01J4CDD9A59CK3`;

      if (periodOptions.interval)
        queryUrl += `&interval=${periodOptions.interval}`;
      if (periodOptions.outputsize)
        queryUrl += `&outputsize=${periodOptions.outputsize}`;

      const response = await fetch(queryUrl);
      const info = await response.json();

      let timeSeries = {};
      if (selectedPeriod === "1D") {
        timeSeries = info["Time Series (5min)"];
      } else if (
        selectedPeriod === "1W" ||
        selectedPeriod === "1M" ||
        selectedPeriod === "MAX"
      ) {
        timeSeries = info["Time Series (Daily)"];
      }

      if (!timeSeries) {
        console.error("Time Series data is unavailable");
        return;
      }

      const labels = [];
      const data = [];

      const today = new Date();
      const todayString = today.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      const dateRange =
        selectedPeriod === "1D"
          ? 1
          : selectedPeriod === "1W"
          ? 7
          : selectedPeriod === "1M"
          ? 30
          : Infinity; // No limit for MAX

      for (const date in timeSeries) {
        const isWithinRange =
          new Date(date) >= new Date(today - dateRange * 24 * 60 * 60 * 1000);
        if (!isWithinRange) continue;

        labels.push(date);
        data.push(parseFloat(timeSeries[date]["4. close"]));
      }

      setStockData({
        labels: labels.reverse(),
        data: data.reverse(),
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  return {
    stockData,
    selectedPeriod,
    setSelectedPeriod,
  };
};
