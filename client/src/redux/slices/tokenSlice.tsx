import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  accessToken: string | null;
}

const initialState: TokenState = {
  accessToken: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = tokenSlice.actions;
export const selectAccessToken = (state: { token: TokenState }) =>
  state.token.accessToken;

export default tokenSlice.reducer;
