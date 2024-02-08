import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  orderBy: string;
  selectedLanguage: string | null;
  selectedLocation: string | null;
  selectedCategory: string | null;
}

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    orderBy: "",
    selectedLanguage: null,
    selectedLocation: null,
    selectedCategory: null,
  } as FilterState,
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setOrderBy,
  setSelectedLanguage,
  setSelectedLocation,
  setSelectedCategory,
} = filterSlice.actions;
export default filterSlice.reducer;
