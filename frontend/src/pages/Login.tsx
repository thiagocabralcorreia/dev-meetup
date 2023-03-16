import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Input from "../components/Input";
import api from "../services/api";
import { ClipLoader } from "react-spinners";
import { FaExclamationCircle } from "react-icons/fa";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(`Email: ${email}, Password: ${password}`);

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      navigate("/dashboard");

      console.log("Success login!");
      setEmail("");
      setPassword("");
      setIsSubmitting(false);
    } else {
      const { message } = response.data;
      console.log("Error message:", message);
      setErrorMessage(message);
      setIsSubmitting(false);
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
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
              className="h-5 flex gap-x-2 mt-[-8px] mb-2 content-center"
            >
              <FaExclamationCircle className="text-danger self-center" />
              <p className="form-error">{errorMessage}</p>
            </motion.div>
          )}
          <button
            type="submit"
            className={`form-buttom ${
              isSubmitting ? "btn-disabled" : "btn-able"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader color="#ffffff" size={18} className="m-1" />
            ) : (
              "Login"
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Login;
