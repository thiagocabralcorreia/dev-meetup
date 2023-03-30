import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import * as io from "socket.io-client";

import api from "../services/api";
import EventCard from "../components/EventCard";
import Select from "../components/Select";
import Modal from "../components/Modal";

import { EventSchema } from "../types/event";
import { CategorySchema } from "../types/category";
import { eventCategory } from "../utils/eventCategory";
import { formatDate } from "../utils/formatDate";

import "react-toastify/dist/ReactToastify.css";
import { EventRequestchema } from "../types/eventRequest";

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
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [events, setEvents] = useState<EventSchema[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selected, setSelected] = useState<CategorySchema>(categories[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [eventsRequest, setEventsRequest] = useState<EventRequestchema[]>([]);

  const filterHandler = async (query: CategorySchema) => {
    if (query.value === "myevents") {
      setSelected({ value: "myevents", name: "My Events" });
      const response = await api.get("user/events", { headers: { user } });
      setEvents(response.data.events);
    } else {
      setSelected(query);
      getEvents(query.value);
    }
  };

  const getEvents = async (filter: string) => {
    const url = filter !== "" ? `/dashboard/${filter}` : "/dashboard";
    const response = await api.get(url, { headers: { user } });

    setEvents(response.data.events);
  };

  useEffect(() => {
    getEvents(selected.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canDelete]);

  const socket = useMemo(
    () => io.connect("http://localhost:8000/", { query: { user: user_id } }),
    [user_id]
  );

  useEffect(() => {
    socket.on("registration_request", (data) =>
      setEventsRequest([...eventsRequest, data])
    );
  }, [eventsRequest, socket]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toastSuccess = (message: string) =>
    toast.success(message, { autoClose: 2000 });

  const toastError = (message: string) =>
    toast.error(message, { autoClose: 2000 });

  const deleteEventHandler = async (eventId: string) => {
    setCanDelete(true);
    try {
      await api.delete(`/event/${eventId}`, { headers: { user } });
      setIsOpen(false);
      toastSuccess("The event was deleted successfully!");

      setTimeout(() => {
        setCanDelete(false);
      }, 4000);
    } catch (error) {
      setIsOpen(false);
      toastError("Error when deleting event!");

      setTimeout(() => {
        setCanDelete(false);
      }, 4000);
    }
  };

  const onModelOpen = async (eventId: string) => {
    // Open delete confirmation modal
    setIsOpen(true);
    setSelectedEventId(eventId);
  };

  const registrationRequestHandler = async (event: EventSchema) => {
    try {
      await api.post(`/registration/${event.id}`, {}, { headers: { user } });

      toastSuccess(
        `The request for the event ${event.title} was successfully!`
      );
    } catch (error) {
      toastError(
        `The request for the event ${event.title} wasn't successfully!`
      );
    }
  };

  const acceptEventHandler = async (eventId: string) => {
    try {
      await api.post(
        `/registration/${eventId}/approvals`,
        {},
        { headers: { user } }
      );

      toastSuccess("Event approved successfully!");
      removeNotificationFromDashboard(eventId);
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

      toastSuccess("Event rejected!");
      removeNotificationFromDashboard(eventId);
    } catch (err) {
      console.log(err);
    }
  };

  const removeNotificationFromDashboard = (eventId: string) => {
    const newEvents = eventsRequest.filter((event) => event._id !== eventId);
    setEventsRequest(newEvents);
  };

  const newestEvents = events.slice().reverse();

  return (
    <div className="header-height min-h-screen pb-5">
      <ToastContainer />
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

      <div className="w-auto mt-10 px-10 md:px-16">
        {eventsRequest.map((request) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -180 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white w-auto m-auto p-6 rounded-lg"
              key={request.id + request._id}
            >
              <div className="text-gray-900">
                <strong>{request.user.email} </strong> is requesting to register
                to your Event <strong>{request.event.title}</strong>
              </div>
              <div className="mt-3 flex gap-x-2">
                <button
                  className="py-2 px-4 transition duration-150 ease-out
                    hover:ease-in rounded-3xl font-bold text-white text-sm btn-cancel"
                  onClick={() => rejectEventHandler(request._id)}
                >
                  Reject
                </button>
                <button
                  className="py-2 px-4 transition duration-150 ease-out
                    hover:ease-in rounded-3xl font-bold text-white text-sm btn-able"
                  onClick={() => acceptEventHandler(request._id)}
                >
                  Accept
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

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
            onClick={() => registrationRequestHandler(event)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
