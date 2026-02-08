// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/hooks/fakeAuth";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // email or contact number
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const logged = loginUser(identifier, password);

    if (!logged) {
      alert("Tangina mo! Invalid credentials.");
      return;
    }

    // Redirect based on role
    if (logged.role === "Admin" || logged.role === "Staff") {
      navigate("/dashboard"); // Admin/Staff go to admin dashboard
    } else {
      navigate("/patient-dashboard"); // Patient goes to patient dashboard
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f4f4]">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email or Contact Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          onClick={handleLogin}
          className="w-full bg-[#8b5e3c] text-white py-2 rounded mb-2"
        >
          Login
        </button>

        <div
          className="justify-center text-center items-center mt-4 text-sm text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default Login;
