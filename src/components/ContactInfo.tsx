import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  PaymentDetails,
  ShippingAddress,
  BillingAddress,
  PersonalDetails,
} from "../components";
import { useState } from "react";
export const ContactInfo = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});

  const handleShippingChange = (address: any) => {
    setShippingAddress(address);
    if (sameAsShipping) {
      setBillingAddress(address);
    }
  };

  const handleBillingChange = (address: any) => {
    setBillingAddress(address);
  };

  const handleCheckBoxChange = (e: any) => {
    setSameAsShipping(e.target.checked);

    if (e.target.checked) {
      setBillingAddress(shippingAddress);
    } else {
      setBillingAddress({
        subAddress: "",
        state: "",
        district: "",
        block: "",
        pincode: "",
      });
    }
  };
  return (
    <div className="px-5 py-6 text-gray-900 md:px-8">
      <div className="flow-root">
        <div className="-my-6 divide-y divide-gray-200">
          <div className="py-6">
            <form>
              <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                <PersonalDetails user={user} />
                <hr className="my-8" />
                <PaymentDetails />
                <hr className="my-8" />
                <ShippingAddress onChange={handleShippingChange} />
                <hr className="my-8" />
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Billing information
                  </h3>

                  <div className="mt-6 flex items-center">
                    <input
                      id="same-as-shipping"
                      name="same-as-shipping"
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={handleCheckBoxChange}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <div className="ml-2">
                      <label
                        htmlFor="same-as-shipping"
                        className="text-sm font-medium text-gray-900"
                      >
                        Same as shipping information
                      </label>
                    </div>
                  </div>
                </div>
                {
                  <BillingAddress
                    onChange={handleBillingChange}
                    address={billingAddress}
                    isChecked={sameAsShipping}
                  />
                }
                <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Make payment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
