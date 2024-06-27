import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicAxios } from "../utils/axiosClient";
import axios from "axios";

const Verification = () => {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await publicAxios.get(`/auth/verify/${token}`, {
          withCredentials: true,
        });
        setMessage(response.data.message);
        navigate("/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setMessage(error.response.data.error);
          } else {
            setMessage("Verification Failed!");
          }
        } else {
          setMessage("Verification Failed!");
        }
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">{message}</div>
  );
};

export default Verification;
