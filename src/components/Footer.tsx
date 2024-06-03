import React from "react";

export const Footer = () => {
  return (
    <section className="py-8 bg-white" id="footer">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="text-center md:text-left p-4">
          <h3 className="text-2xl text-gray-800 mb-4">
            Groco{" "}
            <img
              src="./images/favicon.PNG"
              alt="favicon"
              className="inline h-8 ml-2"
            />
          </h3>
          <p className="text-gray-600 mb-4">
            Feel Free To Follow Us On Our Social Media Handles. All The Links
            Are Given Below
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-800 hover:text-green-500">
              <i className="fab fa-facebook text-3xl" />
            </a>
            <a href="#" className="text-gray-800 hover:text-green-500">
              <i className="fab fa-twitter text-3xl" />
            </a>
            <a href="#" className="text-gray-800 hover:text-green-500">
              <i className="fab fa-instagram text-3xl" />
            </a>
            <a href="#" className="text-gray-800 hover:text-green-500">
              <i className="fab fa-linkedin text-3xl" />
            </a>
          </div>
        </div>
        <div className="text-center md:text-left p-4">
          <h3 className="text-2xl text-gray-800 mb-4">Contact Info</h3>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-phone text-green-500 mr-2" />
            +91 9876342156
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-phone text-green-500 mr-2" />
            +91 7873511502
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-envelope text-green-500 mr-2" />
            info@groco.com
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-map-marker text-green-500 mr-2" />
            Sector-5, Kolkata, India
          </a>
        </div>
        <div className="text-center md:text-left p-4">
          <h3 className="text-2xl text-gray-800 mb-4">Quick Links</h3>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            Home
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            Feature
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            Product
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            Categories
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            Review
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            FAQ
          </a>
          <a href="#" className="block text-gray-600 mb-2">
            <i className="fa fa-arrow-right text-green-500 mr-2" />
            Blogs
          </a>
        </div>
        <div className="text-center md:text-left p-4">
          <h3 className="text-2xl text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-4">Subscribe For Latest Updates</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-gray-200 text-lg p-2 rounded-lg mb-4"
          />
          <input
            type="submit"
            defaultValue="Subscribe"
            className="w-full bg-green-500 text-white text-lg py-2 rounded-lg cursor-pointer"
          />
          <img
            src="./images/payment.png"
            alt="payment"
            className="mt-4 w-full h-12 object-cover"
          />
        </div>
      </div>
      <div className="text-center text-gray-800 py-4 border-t mt-4">
        Copyright ©{" "}
        <span className="text-green-500 font-bold">www.groco.com</span> All
        rights reserved!
      </div>
    </section>
  );
};
