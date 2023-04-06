import { motion } from "framer-motion";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Input from "../components/Input";
import api from "../services/api";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toastSuccess = () =>
    toast.success("Account registered successfully! 🤘", { autoClose: 2000 });

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
          const user_id = response.data.user_id || false;
          // If everything is ok, register, login and navigate to login page

          if (user && user_id) {
            localStorage.setItem("user", user);
            localStorage.setItem("user_id", user_id);

            toastSuccess();
            setTimeout(() => {
              navigate("/login");
              setIsSubmitting(false);
            }, 2000);
          } else {
            const { message } = response.data;
            setErrorMessage(message);

            setTimeout(() => {
              setIsSubmitting(false);
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
      }, 2000);
    }
  };

  return (
    <div className="form-wrapper">
      <ToastContainer />
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
            label="First name"
            placeholder="Enter your first namee"
            id="firstName"
            name="firstName"
            value={firstName}
            maxLength={60}
            handleChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Last name"
            placeholder="Enter your last name"
            id="lastName"
            name="lastName"
            value={lastName}
            maxLength={60}
            handleChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter your best email"
            id="email"
            name="email"
            maxLength={50}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter a password"
            id="password"
            name="password"
            maxLength={50}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            required
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
