import { Heading } from "./Heading";

export const Blogs = () => {
  return (
    <section className="py-8" id="blogs">
      <Heading>
        Our
        <span className="bg-green-500 text-white px-4 py-2 heading">Blogs</span>
      </Heading>

      <div className="grid gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            key={index}
          >
            <img
              src="./images//blog-1.jpg"
              alt="Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-green-500">
                    account_circle
                  </span>
                  <span className="text-gray-800 ml-2">By User</span>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-green-500">
                    calendar_today
                  </span>
                  <span className="text-gray-800 ml-2">19th Aug, 2022</span>
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 mb-4">
                Fresh And Organic Vegetables And Fruits
              </h3>
              <p className="text-gray-600 mb-6">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
                omnis ullam dolores temporibus natus id accusantiumLorem, ipsum
                dolor sit amet consectetur adipisicing elit. Qui omnis ullam
                dolores temporibus natus id accusantium.
              </p>
              <a
                href="#"
                className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
