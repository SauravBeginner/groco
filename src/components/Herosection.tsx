export const Herosection = () => {
  return (
    <div className="px-10">
      <section
        className="grid grid-cols-1 md:grid-cols-2 py-10  bg-white items-center"
        id="container-row-hero-body"
      >
        <div className="text-center md:text-left p-10">
          <h1 className="text-4xl text-gray-800 mb-4">
            You'll Get The Best Fresh{" "}
            <span className="text-green-500">Vegetable</span> Here
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            earum, illo, alias aut ipsa rem sunt similique inventore nisi sequi
            ratione, illum quos ullam quas voluptatum quo odio? Iusto,
            doloremque.
          </p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Read More
          </a>
        </div>
        <div className="px-10 md:px-0">
          <img
            src="./images/hero-veg-2.0.jpg"
            alt="hero-veg-2.0"
            className="w-full h-full object-cover"
            style={{ width: "300px", height: "200px" }}
          />
        </div>
      </section>
      <section
        className="grid grid-cols-1 md:grid-cols-2 py-10 bg-white items-center"
        id="container-row-hero-body-2"
      >
        <div className="order-2 md:order-1 px-10 md:px-0">
          <img
            src="./images/hero-fruit-2.0.jpg"
            alt="hero-fruit-2.0"
            className="w-full h-full object-cover"
            style={{ width: "300px", height: "200px" }}
          />
        </div>
        <div className="text-center md:text-left px-10 md:px-0 order-1 md:order-2">
          <h1 className="text-4xl text-gray-800 mb-4">
            You'll Get The Best Fresh{" "}
            <span className="text-green-500">Fruits</span> Here
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            earum, illo, alias aut ipsa rem sunt similique inventore nisi sequi
            ratione, illum quos ullam quas voluptatum quo odio? Iusto,
            doloremque.
          </p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Read More
          </a>
        </div>
      </section>
      <section
        className="grid grid-cols-1 md:grid-cols-2 py-10 bg-white items-center"
        id="container-row-hero-body-3"
      >
        <div className="text-center md:text-left px-10 md:px-0">
          <h1 className="text-4xl text-gray-800 mb-4">
            We Have Hundreds Of{" "}
            <span className="text-green-500">Dairy Products</span> Here
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            earum, illo, alias aut ipsa rem sunt similique inventore nisi sequi
            ratione, illum quos ullam quas voluptatum quo odio? Iusto,
            doloremque.
          </p>
          <a
            href="#"
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
          >
            Read More
          </a>
        </div>
        <div className="px-10 md:px-0">
          <img
            src="./images/dairy-hero-3.jpg"
            alt="dairy-hero-3"
            className="w-full h-full object-cover"
            style={{ width: "300px", height: "200px" }}
          />
        </div>
      </section>
    </div>
  );
};
