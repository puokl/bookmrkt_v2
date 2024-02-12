import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  orderBy: string;
  selectedLanguage: string | null;
  selectedLocation: string | null;
  selectedCategory: string | null;
}

const getStoredLocation = (): string | null => {
  const storedLocation = localStorage.getItem("selectedLocation");
  return storedLocation ? storedLocation : null;
};

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    orderBy: "",
    selectedLanguage: null,
    selectedLocation: getStoredLocation(),
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
      localStorage.setItem("selectedLocation", action.payload || "");
      state.selectedLanguage = null;
      state.selectedCategory = null;
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
