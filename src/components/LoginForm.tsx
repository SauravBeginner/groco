import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { SigninInput } from "@10xcoder/groco-common";
import { Button } from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/rootReducer";

export const LoginForm = () => {
  const [credentials, setCredentials] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: RootState) => state.auth?.error);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(login(credentials));

    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };
  return (
    <div className="w-1/2 lg:w-3/4 col-span-1 lg:col-span-2 items-center justify-center">
      <div className="px-2 md:px-12">
        <p className="text-2xl font-bold text-gray-900 md:text-4xl">Log In </p>
        <p className="mt-4 text-lg text-gray-600">
          Don't have an account,{" "}
          <Link
            to="/signup"
            className="text-sm font-semibold text-blue-500 underline"
          >
            click here
          </Link>
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div className="grid w-full  items-center gap-1.5">
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
            />
          </div>

          <Button type="submit">Login</Button>
        </form>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};
