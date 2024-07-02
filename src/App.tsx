import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import AuthHandle from "./layout/AuthHandle";
import AuthLayout from "./layout/AuthLayout";

const Home = React.lazy(() => import("./pages/Home"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const AllProducts = React.lazy(() => import("./pages/AllProducts"));
const Blogs = React.lazy(() => import("./pages/Blogs"));

const Signup = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const Verification = React.lazy(() => import("./pages/Verification"));
const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const CheckOut = React.lazy(() => import("./pages/CheckOut"));

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Suspense
        fallback={
          <div className="flex h-screen justify-center items-center">
            <h1>loading...</h1>
          </div>
        }
      >
        <Routes>
          <Route
            element={
              <AuthHandle>
                <AuthLayout />
              </AuthHandle>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:token" element={<Verification />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/checkOut" element={<CheckOut />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
