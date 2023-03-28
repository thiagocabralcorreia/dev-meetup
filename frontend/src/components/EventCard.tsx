import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import MenuDropdown from "./MenuDropdown";

interface EventCardProps {
  eventId: string;
  userId: string;
  category: string;
  image: string;
  title: string;
  date: string;
  place: string;
  price: number;
  description: string;
  isEditable: boolean;
  deleteHandler?: () => void;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  eventId,
  userId,
  category,
  image,
  title,
  date,
  place,
  price,
  description,
  isEditable,
  deleteHandler,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -180 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="relative max-[940px]:m-auto max-sm:w-80 w-full pt-10 max-[940px]:mb-[50px] mb-14"
    >
      <div className="absolute  mx-auto top-0 left-0 right-0 px-3 max-sm:w-80 w-96 h-48 z-10">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg bg-gray-200"
          />
          <div className="absolute top-2 left-2 p-2 rounded-lg font-bold text-sm text-white bg-pblue">
            {category}
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-sm:w-80 w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="pt-40" />
        <div className="pt-2 px-4">
          <div className="flex justify-between content-center">
            <div className="flex items-center gap-x-1 mb-2 text-sm text-gray-500">
              <FiMapPin />
              <div>{place}</div>
            </div>
            {isEditable ? (
              <MenuDropdown deleteHandler={deleteHandler} />
            ) : (
              <></>
            )}
          </div>
          <div className="font-bold text-xl text-pblue">{title}</div>
          <div className="text-md text-gray-600 mb-5 whitespace-pre-line">
            {description}
          </div>

          <div className="md:flex justify-between content-center pb-3 gap-x-4">
            <div className="flex gap-x-4">
              <div className="flex items-center gap-x-1 mb-2 text-sm text-gray-500">
                <FiCalendar />
                <div>{date}</div>
              </div>
              <div className="flex items-center mb-2 text-sm">
                <FaDollarSign className="text-gray-500" />
                <div className="text-gray-500">{price}</div>
              </div>
            </div>
            <button
              className=" mb-2 py-2 px-4 transition duration-150 ease-out
              hover:ease-in rounded-3xl font-bold text-white text-xm btn-able"
              onClick={onClick}
            >
              Registration Request
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
