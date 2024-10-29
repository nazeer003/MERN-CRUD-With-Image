import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Products from "./components/Products/products";
import ProductForm from "./components/ProductForm/productform";
import Update from "./components/Update/Update";

function App() {
  const handleUpdateSuccess = () => {
    console.log("Update was successful!");
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productform" element={<ProductForm />} />
        <Route
          path="/Update/:id"
          element={<Update onUpdateSuccess={handleUpdateSuccess} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
