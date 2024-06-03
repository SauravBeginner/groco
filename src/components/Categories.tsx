import React from "react";
import Heading from "./Heading";

export const Categories = () => {
  return (
    <section className="py-8" id="categories">
      <Heading>
        Product{" "}
        <span className="bg-green-500 text-white px-4 py-2 heading">
          Categories
        </span>
      </Heading>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/cat-1.png"
            alt="cat-1"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Vegetables</h3>
          <p className="text-gray-600 mb-4">Upto 30% Off</p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Shop Now
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/cat-2.png"
            alt="cat-2"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Fresh Fruits</h3>
          <p className="text-gray-600 mb-4">Upto 25% Off</p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Shop Now
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/cat-3.png"
            alt="cat-3"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Dairy Product</h3>
          <p className="text-gray-600 mb-4">Upto 40% Off</p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Shop Now
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src="./images/cat-4.png"
            alt="cat-4"
            className="mx-auto mb-4 h-40"
          />
          <h3 className="text-2xl text-gray-800 mb-4">Fresh Meat</h3>
          <p className="text-gray-600 mb-4">Upto 15% Off</p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};
