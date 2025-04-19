import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../api/AxiosInstance";
import { jwtDecode } from "jwt-decode";

import { loginSuccess } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      const { token } = res.data;
      const decodeToken = jwtDecode(token);
      const role = decodeToken.role;
      dispatch(loginSuccess(token));

      if (role === "Admin") {
        navigate("/Admin/dashboard");
      } else if (role === "Seller") {
        navigate("/seller/Dashboard");
      } else if (role === "Buyer") {
        navigate("/buyer/Dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block bg-blue-500 text-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back 👋</h2>
          <p className="text-lg">Please login to continue to your dashboard</p>
        </div>
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please login to your account to continue.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
