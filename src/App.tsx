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
