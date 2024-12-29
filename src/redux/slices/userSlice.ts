import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
    addFavorite: (state, action) => {
      if (state.user) {
        state.user.favorite.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      if (state.user) {
        state.user.favorite = state.user.favorite.filter(
          (id) => id !== action.payload
        );
      }
    },
     setCartSize: (state, action) => {
    if (state.user) {
      state.user.cartSize = action.payload;
     }
    },
  },
});

export const { setUser, deleteUser, addFavorite, removeFavorite, setCartSize } = userSlice.actions;
export default userSlice.reducer;
