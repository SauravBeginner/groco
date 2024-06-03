import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Featured from "./components/Featured";
import { Products } from "./components/Products";
import { Categories } from "./components/Categories";
import { Herosection } from "./components/Herosection";
import { Reviews } from "./components/Reviews";
import { Blogs } from "./components/Blogs";
import { Footer } from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Banner />
      <section className="px-8">
        <Featured />
        <Products />
        <Categories />
        <Herosection />
        <Reviews />
        <Blogs />
      </section>
      <Footer />
    </>
  );
}

export default App;
