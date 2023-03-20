import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaDollarSign, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiCalendar, FiMapPin } from "react-icons/fi";

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
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -180 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="relative self-center max-[940px]:m-auto max-sm:w-80 w-full pt-10 max-[940px]:mb-[50px] mb-14"
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
          <div className="flex items-center gap-x-1 mb-2 text-sm text-gray-500">
            <FiMapPin />
            <div>{place}</div>
          </div>
          <div className="font-bold text-xl text-pblue">{title}</div>
          <div className="text-md text-gray-600 mb-5 whitespace-pre-line">
            {description}
          </div>

          <div className="relative flex pb-3 gap-x-4">
            <div className="flex items-center gap-x-1 mb-2 text-sm text-gray-500">
              <FiCalendar />
              <div>{date}</div>
            </div>
            <div className="flex items-center mb-2 text-sm">
              <FaDollarSign className="text-gray-500" />
              <div className="text-gray-500">{price}</div>
            </div>
            <div className="absolute top-0 right-0 pb-1 text-lg">
              {isFavorite ? (
                <FaHeart
                  className="cursor-pointer text-primary"
                  onClick={handleFavoriteClick}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer text-gray-500"
                  onClick={handleFavoriteClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
