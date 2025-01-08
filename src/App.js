import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Container from "./components/Container";
import { useState } from "react";

function App() {
  const [stockQuery, setStockQuery] = useState("");

  function handleStockQuery(query) {
    setStockQuery(query);
  }
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <Layout inputValue={stockQuery} changeListener={handleStockQuery} />
          }
        />
        <Route
          path="/main"
          element={
            <Dashboard
              inputValue={stockQuery}
              changeListener={handleStockQuery}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
