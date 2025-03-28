import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const users = {
    admin: { name: "AdminUser", email: "admin@gmail.com", password: "admin123" },
    user: { name: "NormalUser", email: "user@gmail.com", password: "user123" },
    owner: { name: "StoreOwner", email: "owner@gmail.com", password: "owner123" },
  };

  const handleLogin = () => {
    if (!role || !name || !email || !password) {
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    if (
      users[role] &&
      users[role].name === name &&
      users[role].email === email &&
      users[role].password === password
    ) {
      toast.success("Login successful!", { position: "top-right" });
      const userData = { name, email, role };
      localStorage.setItem("user", JSON.stringify(userData));

      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "user") navigate("/user-dashboard");
      else if (role === "owner") navigate("/owner-dashboard");
    } else {
      toast.error("Invalid credentials. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-body">
        <h2 className="login-title">Login</h2>
        <div className="input-fields">
          <input
            type="text"
            className="login-input"
            placeholder="Ex: AdminUser, NormalUser, StoreOwner"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="login-input"
            placeholder="Ex: admin, user, owner@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Ex: admin123, user123, owner123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select className="login-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select a Role</option>
            <option value="admin">System Administrator</option>
            <option value="user">Normal User</option>
            <option value="owner">Store Owner</option>
          </select>

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
