const Banner = () => {
  return (
    <section
      className="home flex justify-center items-center bg-cover bg-center py-40"
      id="home"
      style={{ backgroundImage: 'url("./images/banner-img.jpg")' }}
    >
      <div className="text-center w-2/3">
        <h3 className="text-4xl text-gray-800 mb-4">
          Fresh And <span className="text-green-500">Organic</span> Product For
          You
        </h3>
        <p className="text-gray-600 text-lg mb-4">
          This Website Is Designed By Mr. Kunal Chandra Das. This Is My
          Portfolio Professional Project No-1
        </p>
        <a
          href="#"
          className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Banner;
