import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Input from "../components/Input";
import api from "../services/api";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      navigate("/dashboard");
      console.log("Success login!");
    } else {
      const { message } = response.data;
      console.log("Error message:", message);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
        >
          <h1 className="form-title">Login</h1>
          <p className="form-subtitle">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="form-link">
              Signup
            </Link>
          </p>
          <Input
            type="email"
            placeholder="Email address"
            id="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            isRequired
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            isRequired
          />
          <button type="submit" className="form-buttom">
            Login
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Login;
