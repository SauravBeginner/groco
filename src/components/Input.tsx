import { useId } from "react";

export interface LabelInputType {
  className?: string;
  type?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

export const Input = ({ className, type, label, ...props }: LabelInputType) => {
  const id = useId();

  return (
    <>
      <label
        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="email"
      >
        {label}
      </label>
      <input
        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50   dark:focus:ring-offset-gray-900"
        type={type || "text"}
        id={id}
        {...props}
      />
    </>
  );
};
