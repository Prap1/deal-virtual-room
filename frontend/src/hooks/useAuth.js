import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/authSlice";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = (token) => {
    dispatch(loginSuccess(token));
  };

  const signout = () => {
    dispatch(logout());
  };

  return {
    ...auth, // token, user, isAuthenticated
    login,
    logout: signout,
  };
};

export default useAuth;
