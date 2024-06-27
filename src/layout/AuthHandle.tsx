import React, { useEffect, useState } from "react";
import { publicAxios } from "../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
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
