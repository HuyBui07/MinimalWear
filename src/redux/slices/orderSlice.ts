import { createSlice } from "@reduxjs/toolkit";

type Order = {
  date: string;
  delivery: string;
  address?: string;
  payment?: string;
  products: [
    {
      productId: string;
      name: string;
      image: string;
      price: number;
      color: string;
      size: string;
      quantity: number;
    }
  ];
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null as Order | null,
  },
  reducers: {
    addOrder: (state, action) => {
      if (!state.order) {
        state.order = {
          date: new Date().toISOString(),
          delivery: "standard",
          products: action.payload,
        };
        return;
      } else {
        state.order.products = action.payload;
      }
    },
    setDelivery: (state, action) => {
      if (state.order) {
        state.order.delivery = action.payload;
      }
    },
    setAddress: (state, action) => {
        if (state.order) {
            state.order.address = action.payload;
        }
    },
    setPayment: (state, action) => {
        if (state.order) {
            state.order.payment = action.payload;
        }
    }
  },
});

export const { addOrder, setDelivery, setAddress, setPayment } = orderSlice.actions;
export default orderSlice.reducer;
