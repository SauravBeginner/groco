import { useEffect, useState } from "react";
import { base_URL } from "../utils";
import axios from "axios";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${base_URL}/users/bulk`, { withCredentials: true })
      .then((response: any) => {
        console.log(response);
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { users, loading };
};
