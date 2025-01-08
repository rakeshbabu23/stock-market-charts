import React, { useState } from "react";
import Container from "../components/Container";
import TextInput from "../components/TextInput";
import Home from "./Home";

const Layout = ({ inputValue, changeListener }) => {
  // const [stockQuery, setStockQuery] = useState("");
  // function handleStockQuery(query) {
  //   setStockQuery(query);
  // }
  return (
    <div>
      <TextInput inputValue={inputValue} changeListener={changeListener} />
      <Home />
    </div>
  );
};

export default Layout;
