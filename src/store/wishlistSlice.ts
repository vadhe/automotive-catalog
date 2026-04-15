import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: number[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.items.indexOf(id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
