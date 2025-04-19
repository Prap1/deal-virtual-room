import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createdeal } from "../../redux/dealSlice";
import { toast } from "react-toastify"; // Optional: Better UX than alert

const DealForm = ({ sellerId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Retrieve the token from localStorage (or from wherever you store it)
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("❌ No token found, please login.");
        return;
      }

      // Dispatch the createdeal action with token in headers
      const resultAction = await dispatch(createdeal({ ...data, sellerId, token }));

      if (createdeal.fulfilled.match(resultAction)) {
        toast.success("✅ Deal Created Successfully!");
        reset();
      } else {
        throw new Error(resultAction.payload?.message || "Unknown error");
      }
    } catch (err) {
      console.error("❌ Error creating deal:", err);
      toast.error("❌ Failed to create deal.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create a New Deal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Deal Title"
            className="w-full p-2 border rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Deal Description"
            className="w-full p-2 border rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 1, message: "Price must be greater than 0" }
            })}
            type="number"
            placeholder="Deal Price"
            className="w-full p-2 border rounded-md"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white py-2 rounded-md hover:bg-blue-600`}
          >
            {loading ? 'Creating Deal...' : 'Create Deal'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealForm;
