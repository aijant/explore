import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthResponse } from "@store/models/interfaces/account.interfaces";

enum StorageKeys {
  TOKEN = "@auth",
}

export type TAuth = {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const authFromStorage = JSON.parse(
  localStorage.getItem(StorageKeys.TOKEN) || "{}"
);

const initialState: TAuth = {
  isAuth: !!authFromStorage?.isAuth || false,
  accessToken: authFromStorage?.accessToken || null,
  refreshToken: authFromStorage?.refreshToken || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action: PayloadAction<IAuthResponse>) => {
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem(
        StorageKeys.TOKEN,
        JSON.stringify({ isAuth: true, ...action.payload })
      );
    },
    logOut: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem(StorageKeys.TOKEN);
    },
  },
});

export const { saveAuth, logOut } = authSlice.actions;

export default authSlice.reducer;
