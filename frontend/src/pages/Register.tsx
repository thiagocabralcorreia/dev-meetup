import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="form-wrapper">
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
            placeholder="Email address"
            id="firstName"
            name="firstName"
            value={firstName}
            handleChange={handleFirstNameEmailChange}
            isRequired
          />
          <Input
            type="text"
            placeholder="Email address"
            id="lastName"
            name="lastName"
            value={lastName}
            handleChange={handleLastNameChange}
            isRequired
          />
          <Input
            type="email"
            placeholder="Email address"
            id="email"
            name="email"
            value={email}
            handleChange={handleEmailChange}
            isRequired
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            handleChange={handlePasswordChange}
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
