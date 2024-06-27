import { useEffect, useState } from "react";

import { publicAxios } from "../utils/axiosClient";
import { Cart } from "../types";

export const useCarts = () => {
  const [carts, setCarts] = useState<Cart | null>(null);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicAxios
      .get(`/cart/get`, { withCredentials: true })
      .then((response: any) => {
        setCarts(response.data?.cart);
        setTotal(response.data?.totalPrice);
        setQuantity(response.data?.totalQuantity);

        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [total]);

  return { carts, total, quantity, loading };
};

export const useCartItem = (id: string) => {
  const [loading, setLoading] = useState(true);

  const [product, setCart] = useState<any>(null);

  useEffect(() => {
    publicAxios
      .get(`/product/product-details/${id}`)
      .then((response) => {
        console.log(response);
        setCart(response.data?.product);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);
  return { product, loading };
};
