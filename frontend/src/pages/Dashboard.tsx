import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";
import { EventSchema } from "../types/events";
import { CategorySchema } from "../types/category";
import Select from "../components/Select";
import { eventCategory } from "../utils/eventCategory";
import EventCard from "../components/EventCard";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

const categories = [
  { value: "", name: "All categories" },
  { value: "", name: "All categories" },
  { value: "myevents", name: "My Events" },
  { value: "frontend", name: "Front-end" },
  { value: "backend", name: "Back-end" },
  { value: "fullstack", name: "Full Stack" },
  { value: "miscellaneous", name: "Miscellaneous" },
];

const Dashboard = () => {
  const user_id = localStorage.getItem("user");
  const [events, setEvents] = useState<EventSchema[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selected, setSelected] = useState<CategorySchema>(categories[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);

  const filterHandler = async (query: CategorySchema) => {
    if (query.value === "myevents") {
      setSelected({ value: "myevents", name: "My Events" });
      const response = await api.get("user/events", { headers: { user_id } });
      setEvents(response.data);
    } else {
      setSelected(query);
      getEvents(query.value);
    }
  };

  const getEvents = async (filter: string) => {
    const url = filter !== "" ? `/dashboard/${filter}` : "/dashboard";
    const response = await api.get(url);

    setEvents(response.data);
  };

  const toastSuccess = () =>
    toast.success("The event was deleted successfully!", { autoClose: 2000 });

  const toastError = () =>
    toast.error("Error when deleting event!", { autoClose: 2000 });

  const deleteEventHandler = async (eventId: string) => {
    setCanDelete(true);
    try {
      await api.delete(`/event/${eventId}`);
      setIsOpen(false);

      setTimeout(() => {
        toastSuccess();
        setCanDelete(false);
      }, 2000);
    } catch (error) {
      setIsOpen(false);

      setTimeout(() => {
        toastError();
        setCanDelete(false);
      }, 2000);
    }
  };

  const onModelOpen = async (eventId: string) => {
    // Open delete confirmation modal
    setIsOpen(true);
    setSelectedEventId(eventId);
  };

  const newestEvents = events.slice().reverse();

  useEffect(() => {
    getEvents(selected.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canDelete]);

  return (
    <div className="header-height min-h-screen pb-5">
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onDelete={() => deleteEventHandler(selectedEventId)}
      />
      <motion.div
        initial={{ opacity: 0, x: -180 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="w-72"
      >
        <Select
          selected={selected}
          categories={categories}
          onChange={filterHandler}
          className="h-11 w-[255px] flex justify-between content-center rounded-3xl appearance-none relative
          ml-16 my-6 py-2 pl-5 pr-3 bg-white text-gray-800 border border-none text-sm 
          focus:outline-none cursor-default transition duration-150 ease-out hover:ease-in"
          left="left-16"
        />
      </motion.div>

      <div
        className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1400px]:lg:grid-cols-3
      max-sm:m-2 max-sm:mt-12 m-16 gap-x-8"
      >
        {newestEvents.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            userId={event.user}
            category={eventCategory(event.category)}
            image={event.thumbnail_url}
            title={event.title}
            description={event.description}
            date={formatDate(event.date)}
            place={event.place}
            price={event.price}
            isEditable={event.user === user_id}
            deleteHandler={() => onModelOpen(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
