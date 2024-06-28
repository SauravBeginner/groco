import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchUserDetails } from "../redux/authSlice";

interface AuthHandleProps {
  children: React.ReactNode;
}
const AuthHandle = ({ children }: AuthHandleProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthHandle;
