
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../api/AxiosInstance";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // For testing
    try {
      const res = await axios.post("/user/register", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left panel */}
        <div className="hidden lg:block bg-blue-500 text-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Create Your Account</h2>
          <p className="text-lg">Please register to access the platform.</p>
        </div>

        {/* Right panel - form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Fill in the details to get started.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Your Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Buyer"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span>Buyer</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Seller"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span>Seller</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Admin"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span>Admin</span>
                </label>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
