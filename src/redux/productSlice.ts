import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios } from "../utils/axiosClient";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbNail?: string;
}
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicAxios.get("/product/products", {
        withCredentials: true,
      });
      //   console.log(response.data.user);
      return response.data.products;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred!");
      }
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
