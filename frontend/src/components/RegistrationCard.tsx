import { motion } from "framer-motion";
import { FaDollarSign, FaUser } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi2";
import { RegistrationSchema } from "../types/registration";
import { formatDate } from "../utils/formatDate";

interface RegistrationCardProps {
  registration: RegistrationSchema;
  isApproved?: boolean;
  onAccept: () => void;
  onReject: () => void;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
  isApproved,
  onAccept,
  onReject,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -180 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="m-auto max-sm:w-80 w-96 pt-10 max-[940px]:mb-[50px] mb-14 py-4 px-6 bg-white rounded-lg shadow-lg"
    >
      {/* <div className="rmx-auto max-sm:w-80 w-96 bg-white rounded-lg shadow-lg overflow-hidden py-4 px-6"> */}
      <h2 className="font-bold text-xl text-pblue">
        {registration.eventTitle}
      </h2>
      <div className="md:flex justify-between content-center mt-2 mb-1 gap-x-4">
        <div className="flex gap-x-4">
          <div className="flex items-center gap-x-1 mb-2 text-sm text-gray-500">
            <FiCalendar />
            <p>{formatDate(registration.eventDate)}</p>
          </div>
          <div className="flex items-center mb-2 text-sm">
            <FaDollarSign className="text-gray-500" />
            <p className="text-gray-500">{registration.eventPrice}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-x-2 items-center mt-2 mb-1 text-md text-gray-700">
        <FaUser />
        <h3>{registration.userEmail}</h3>
      </div>
      <div
        className={`flex gap-x-1 items-center pb-3 mb-3 ${
          registration.approved === undefined
            ? "text-gray-600"
            : registration.approved === true
            ? "text-success"
            : "text-danger"
        }`}
      >
        {registration.approved === undefined ? (
          <HiClock size={21} />
        ) : registration.approved === true ? (
          <HiCheckCircle size={21} />
        ) : (
          <HiXCircle size={21} />
        )}
        <p className="text-sm font-bold">
          {registration.approved === undefined
            ? "Pending"
            : registration.approved === true
            ? "Approved"
            : "Rejected"}
        </p>
      </div>
      <div className="flex justify-between gap-x-4">
        <button
          className="w-full mb-2 py-2 px-4 transition duration-150 ease-out
              hover:ease-in rounded-3xl font-bold text-white text-xm btn-cancel"
          onClick={onReject}
        >
          Reject
        </button>
        <button
          className="w-full mb-2 py-2 px-4 transition duration-150 ease-out
              hover:ease-in rounded-3xl font-bold text-white text-xm btn-able"
          onClick={onAccept}
        >
          Accept
        </button>
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default RegistrationCard;
