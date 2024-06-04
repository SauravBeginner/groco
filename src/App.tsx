import "./App.css";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const AllProducts = React.lazy(() => import("./pages/AllProducts"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<h1>loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
