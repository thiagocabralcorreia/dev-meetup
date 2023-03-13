import React, { useState } from "react";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <h1 className="form-title">Login</h1>
        <p className="form-subtitle">
          Don't have an account yet? <a className="form-link">Signup</a>
        </p>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
