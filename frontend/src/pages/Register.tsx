import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Input from "../components/Input";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate that the fields are filled
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      try {
        const users = await api.get("/user");
        const existingEmail = users.data.find(
          (user: { email: string }) => user.email === email
        );

        // Validate if the submitted email has already been registered
        if (!existingEmail) {
          const response = await api.post("/user/register", {
            email,
            password,
            firstName,
            lastName,
          });
          const user = response.data.user || false;
          const userId = response.data._id || false;

          if (user && userId) {
            // If everything is ok, register, login and navigate to the dashboard
            localStorage.setItem("user", userId);
            setIsSubmitting(false);
            navigate("/dashboard");
          } else {
            const { message } = response.data;
            setErrorMessage(message);

            setTimeout(() => {
              setIsSubmitting(false);
              setErrorMessage("");
            }, 2000);
          }
        } else {
          setErrorMessage("Email has already been registered");

          setTimeout(() => {
            setIsSubmitting(false);
          }, 2000);
        }
      } catch (error) {}
    } else {
      setErrorMessage("You need to fill all the Inputs");

      setTimeout(() => {
        setIsSubmitting(false);
        setErrorMessage("");
      }, 2000);
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
          <h1 className="form-title">Register</h1>
          <p className="form-subtitle">
            Already Registered?{" "}
            <Link to={"/login"} className="form-link">
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
              "Register"
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Register;
