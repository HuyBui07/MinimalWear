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
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
