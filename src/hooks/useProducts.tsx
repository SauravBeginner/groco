import { useEffect, useState } from "react";

import { publicAxios } from "../utils/axiosClient";
import { Product } from "../types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicAxios
      .get(`/product/products`, { withCredentials: true })
      .then((response: any) => {
        setProducts(response.data?.products);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { products, loading };
};

export const useProduct = (id: string) => {
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    publicAxios
      .get(`/product/product-details/${id}`)
      .then((response) => {
        console.log(response);
        setProduct(response.data?.product);
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
