import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaComments, FaPlusCircle, FaRegistered } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { RegistrationSchema } from "../types/registration";
import api from "../services/api";

function Header() {
  const { isLoggedIn, setIsloggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const user = localStorage.getItem("user");
  const [myEvents, setMyEvents] = useState<RegistrationSchema[]>([]);

  useEffect(() => {
    getMyEvents();
  }, []);

  const getMyEvents = async () => {
    try {
      const response = await api.get("/registration", { headers: { user } });
      setMyEvents(response.data);
    } catch (error) {}
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setIsloggedIn(false);
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
      className="absolute flex justify-between content-center w-full py-6 px-10 md:px-16 z-50"
    >
      <Link to={"/"}>
        <div className="flex content-center gap-x-4">
          <FaComments className="md:pt-2 text-2xl  md:text-3xl text-primary" />
          <h1 className="font-fredoka text-xl md:text-2xl text-white">
            dev<span className="text-primary">meetup</span>
          </h1>
        </div>
      </Link>
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
          className="flex justify-between gap-x-4"
        >
          {myEvents.length !== 0 && currentPath !== "/registrations" && (
            <Link
              data-tip="Add Event"
              to={"/registrations"}
              className="my-auto cursor-pointer text-white hover:text-primary
          transition duration-150 ease-out hover:ease-in"
            >
              <Tooltip text="Registrations" customStyle="top-10 w-24">
                <FaRegistered className="text-[20px] md:text-[30px]" />
              </Tooltip>
            </Link>
          )}
          {currentPath !== "/create-event" && (
            <Link
              data-tip="Add Event"
              to={"/create-event"}
              className="my-auto cursor-pointer text-white hover:text-primary
          transition duration-150 ease-out hover:ease-in"
            >
              <Tooltip text="Add Event" customStyle="top-10 w-20">
                <FaPlusCircle className="text-[20px] md:text-[30px]" />
              </Tooltip>
            </Link>
          )}
          <div className="my-auto ">
            <Tooltip text="Logout" customStyle="top-10 w-18">
              <RiLogoutCircleRLine
                onClick={logoutHandler}
                className="font-extrabold cursor-pointer text-white hover:text-primary
        transition duration-150 ease-out hover:ease-in text-[22px] md:text-[33px]"
              />
            </Tooltip>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Header;
