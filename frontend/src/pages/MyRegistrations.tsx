/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import RegistrationCard from "../components/RegistrationCard";
import api from "../services/api";
import { RegistrationSchema } from "../types/registration";
// import moment from "moment";

export default function MyRegistrations() {
  const [myEvents, setMyEvents] = useState<RegistrationSchema[]>([]);
  const user = localStorage.getItem("user");

  useEffect(() => {
    getMyEvents();
  }, []);

  const getMyEvents = async () => {
    try {
      const response = await api.get("/registration", { headers: { user } });
      setMyEvents(response.data);
    } catch (error) {}
  };

  const acceptEventHandler = async (eventId: string) => {
    try {
      await api.post(
        `/registration/${eventId}/approvals`,
        {},
        { headers: { user } }
      );
      getMyEvents();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectEventHandler = async (eventId: string) => {
    try {
      await api.post(
        `/registration/${eventId}/rejections`,
        {},
        { headers: { user } }
      );
      getMyEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="header-height min-h-screen pb-5">
      <motion.div
        initial={{ opacity: 0, x: -180 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div
          className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1400px]:lg:grid-cols-3
          max-md:mx-auto max-sm:mt-12 m-16 gap-x-2"
        >
          {myEvents.map((registration: RegistrationSchema) => (
            <RegistrationCard
              key={registration._id}
              registration={registration}
              onAccept={() => acceptEventHandler(registration._id)}
              onReject={() => rejectEventHandler(registration._id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
