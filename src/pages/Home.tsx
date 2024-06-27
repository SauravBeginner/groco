import {
  Banner,
  Blogs,
  Categories,
  Featured,
  Herosection,
  Products,
  Reviews,
} from "../components";
import withScrollTop from "../hoc/withScrollTop";

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

export default withScrollTop(Home);
