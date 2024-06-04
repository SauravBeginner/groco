import Banner from "../components/Banner";
import Featured from "../components/Featured";
import { Products } from "../components/Products";
import { Categories } from "../components/Categories";
import { Herosection } from "../components/Herosection";
import { Reviews } from "../components/Reviews";
import { Blogs } from "../components/Blogs";

const Home = () => {
  return (
    <div>
      <Banner />
      <section className="px-8">
        <Featured />
        <Products />
        <Categories />
        <Herosection />
        <Reviews />
        <Blogs />
      </section>
    </div>
  );
};

export default Home;
