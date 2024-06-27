import { Link } from "react-router-dom";
import { Input } from "./Input";
import { publicAxios } from "../utils/axiosClient";
import { FormEvent, useState } from "react";
import { SignupInput } from "@10xcoder/groco-common";
import { Button } from "./Button";

export const SignupForm = () => {
  const [user, setUser] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
    // role: "user",
  });

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await publicAxios.post("/auth/signup", user, {
        withCredentials: true,
      });

      alert("Verification link has been sent to your email");

      setUser({
        email: "",
        password: "",
        name: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-1/2 lg:w-3/4 col-span-1 lg:col-span-2 items-center justify-center">
      <div className="px-2 md:px-12">
        <p className="text-2xl font-bold text-gray-900 md:text-4xl">Sign Up</p>
        <p className="mt-4 text-lg text-gray-600">
          Already have an account,{" "}
          <Link
            to="/login"
            className="text-sm font-semibold text-blue-500 underline"
          >
            click here
          </Link>
        </p>
        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div className="grid w-full  items-center gap-1.5">
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          {/* <div className="grid w-full  items-center gap-1.5">
            <Input label="Phone Number" type="tel" placeholder="Phone Number" />
          </div> */}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};
