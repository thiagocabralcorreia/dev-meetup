import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Input from "../components/Input";
import api from "../services/api";
import { ClipLoader } from "react-spinners";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await api.post("/login", { email, password });
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        // If everything is ok, login and navigate to the dashboard
        navigate("/");

        console.log("Success login!");
        setEmail("");
        setPassword("");
        setIsSubmitting(false);
      } else {
        const { message } = response.data;

        setTimeout(() => {
          setErrorMessage(message);
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("Error, the server returned an error");
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
            maxLength={50}
            handleChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              name="password"
              maxLength={50}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center justify-center
              p-2 z-10 opacity-50 text-lg text-tertiary"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>

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
