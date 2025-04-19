import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


// Get token from localStorage
const tokenFromStorage = localStorage.getItem("token");
let decodedUser = null;

if (tokenFromStorage) {
  try {
    decodedUser = jwtDecode(tokenFromStorage);
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
  }
}

// Initial state
const initialState = {
  token: tokenFromStorage || null,
  user: decodedUser || null,
  isAuthenticated: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload;
      const decoded = jwtDecode(token);
      state.token = token;
      state.user = decoded;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

// Export actions & reducer
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
