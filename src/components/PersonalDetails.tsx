export const PersonalDetails = ({ user }: any) => {
  return (
    <div>
      <h3
        id="contact-info-heading"
        className="text-lg font-semibold text-gray-900"
      >
        Contact information
      </h3>

      <div className="mt-4 w-full">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Enter your name"
          value={user?.name}
          id="name"
        ></input>
      </div>
    </div>
  );
};
