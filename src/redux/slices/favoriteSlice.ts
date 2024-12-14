import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteItemIds: [] as string[],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteItemIds.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favoriteItemIds = state.favoriteItemIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
