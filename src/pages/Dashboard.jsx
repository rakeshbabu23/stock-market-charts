import React, { useEffect } from "react";
import Selectors from "../components/Selectors";
import Chart from "../components/Chart";
import TextInput from "../components/TextInput";
import { useFetch } from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

const Dashboard = ({ inputValue, changeListener }) => {
  const { stockData, selectedPeriod, setSelectedPeriod } = useFetch(inputValue);
  const location = useLocation();
  const { symbol } = location.state || {};
  useEffect(() => {
    if (symbol) {
      setSelectedPeriod("1D");
      changeListener(symbol);
    }
  }, []);
  return (
    <div>
      <TextInput inputValue={inputValue} changeListener={changeListener} />
      <Selectors
        inputValue={inputValue}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <Chart stockData={stockData} />
    </div>
  );
};

export default Dashboard;
