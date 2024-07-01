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
    editCart: builder.mutation<any, any>({
      query: (body) => ({ url: "/cart/update", method: "PATCH", body }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation<any, any>({
      query: (body) => ({ url: "/cart/delete", method: "DELETE", body }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<any, any>({
      query: () => ({ url: "/cart/clear-cart", method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductDetailsQuery,
  useFetchCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useEditCartMutation,
  useClearCartMutation,
} = apiSlice;
