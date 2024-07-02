import axios from "axios";
import React, { useState } from "react";

export const ShippingAddress = ({ onChange }: any) => {
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState({
    state: "",
    district: "",
    block: "",
    pincode: "",
  });
  const [subAddress, setSubAddress] = useState("");

  const [error, setError] = useState("");
  const fetchLocation = async (pincode: string) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response?.data[0];
      if (data?.Status == "Success") {
        const postOffice = data?.PostOffice[0];
        // const { state, district } = postOffice;
        const newLocation = {
          state: postOffice?.State,
          district: postOffice?.District,
          block: postOffice?.Block,
          pincode: pincode,
        };
        setLocation(newLocation);
        setPincode(pincode);
        onChange({ ...newLocation, subAddress });

        setError("");
      } else if (data?.Status === "Error") {
        setError(data?.Message);
      }
    } catch (error) {
      setError("Error fetching location!");
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6) {
      fetchLocation(value);
    } else {
      setLocation({
        state: "",
        district: "",
        block: "",
        pincode: "",
      });
      onChange({
        subAddress: "",
        state: "",
        district: "",
        block: "",
        pincode: "",
      });
    }
  };
  const handleSubAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubAddress(value);
    onChange({
      ...location,
      subAddress: value,
    });
  };
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="street-address"
              onChange={handleSubAddressChange}
              value={subAddress}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              autoComplete="postal-code"
              onChange={handlePincodeChange}
              value={pincode}
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
          </div>
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            District
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="district"
              name="district"
              autoComplete="address-level2"
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              value={location?.district}
              disabled={true}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="block"
              name="block"
              autoComplete="address-level2"
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              value={location?.block}
              disabled={true}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="region"
              name="region"
              autoComplete="address-level1"
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              value={location?.state}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
