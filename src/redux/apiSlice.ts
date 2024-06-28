import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils/axiosClient";
import { Item, Items } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchProducts: builder.query<Items, void>({
      query: () => "/product/products",
    }),
    fetchProductDetails: builder.query<Item, string>({
      query: (id) => `/product/product-details/${id}`,
    }),
    fetchCart: builder.query<any, void>({
      query: () => "/cart/get",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<any, any>({
      query: (body) => ({ url: "/cart/add", method: "POST", body }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductDetailsQuery,
  useFetchCartQuery,
  useAddToCartMutation,
} = apiSlice;
