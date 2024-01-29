import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  orderBy: string;
}

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    orderBy: "",
  } as FilterState,
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
  },
});

export const { setOrderBy } = filterSlice.actions;
export default filterSlice.reducer;
