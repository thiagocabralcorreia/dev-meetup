import { motion } from "framer-motion";
import { FaComments, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
      className="absolute flex justify-between content-center w-full py-6 px-10 md:px-16 z-50"
    >
      <Link to={"/"}>
        <div className="flex content-center gap-4">
          <FaComments className="md:pt-2 text-2xl  md:text-3xl text-primary" />
          <h1 className="font-fredoka text-xl md:text-2xl text-white">
            dev<span className="text-primary">meetup</span>
          </h1>
        </div>
      </Link>
      <Link
        to={"/event"}
        className="my-auto cursor-pointer text-white hover:text-primary transition duration-150 ease-out hover:ease-in"
      >
        <FaPlusCircle className="text-[20px] md:text-[30px]" />
      </Link>
    </motion.div>
  );
}

export default Header;
