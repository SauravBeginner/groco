import { Heading } from "./Heading";
import { SamllButton } from "./SmallButton";

export const Featured = () => {
  return (
    <section className="py-8" id="features">
      <Heading>
        Our{" "}
        <span className="bg-green-500 text-white px-4 py-2 heading">
          Feature
        </span>
      </Heading>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/feature-img-1.png"
            alt="feature-img-1"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Fresh And Organic</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            nam.
          </p>
          <SamllButton className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-black px-8 py-2 rounded-lg">
            Read More
          </SamllButton>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/feature-img-2.png"
            alt="feature-img-2"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Free Delivery</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            nam.
          </p>
          <SamllButton className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-black px-8 py-2 rounded-lg">
            Read More
          </SamllButton>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/feature-img-3.png"
            alt="feature-img-3"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Easy Payments</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus,
            nam.
          </p>
          <SamllButton className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-black px-8 py-2 rounded-lg">
            Read More
          </SamllButton>
        </div>
      </div>
    </section>
  );
};
