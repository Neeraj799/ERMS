import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "sonner";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const { fetchUser } = useUserContext();
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/login", formData);

      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("role", res?.data?.user?.role);

      const role = res.data.user.role;

      if (res?.data?.success) {
        toast.success(res.data.message || "Login successful");
      }

      await fetchUser();

      if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/engineer");
      }
    } catch (err: any) {
      console.log(err);
      const errorMessage = err.response?.data?.message;
      setError(errorMessage);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg  transition duration-200 shadow-md"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span className=" font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
