import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `FirstName: ${firstName}, LastName: ${lastName}, Email: ${email}, Password: ${password}`
    );

    const response = await api.post("/user/register", {
      firstName,
      lastName,
      email,
      password,
    });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      navigate("/dashboard");
    } else {
      const { message } = response.data;
      console.log(message);
    }
  };

  return (
    <div className="form-wrapper h-4/5">
      <form onSubmit={handleSubmit} className="form">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
        >
          <h1 className="form-title">Register</h1>
          <p className="form-subtitle">
            Already Registered?{" "}
            <Link to={"/"} className="form-link">
              Login here
            </Link>
          </p>
          <Input
            type="text"
            placeholder="First name"
            id="firstName"
            name="firstName"
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
            isRequired
          />
          <Input
            type="text"
            placeholder="Last name"
            id="lastName"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            isRequired
          />
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
            Register
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Register;
