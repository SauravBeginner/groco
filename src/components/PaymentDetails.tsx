export const PaymentDetails = () => {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-900">Payment details</h3>

      <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
        <div className="col-span-3 sm:col-span-4">
          <label
            htmlFor="cardNum"
            className="block text-sm font-medium text-gray-700"
          >
            Card number
          </label>
          <div className="mt-1">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="4242 4242 4242 4242"
              id="cardNum"
            ></input>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-3">
          <label
            htmlFor="expiration-date"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration date (MM/YY)
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="expiration-date"
              id="expiration-date"
              autoComplete="cc-exp"
              className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="cvc"
              id="cvc"
              autoComplete="csc"
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
