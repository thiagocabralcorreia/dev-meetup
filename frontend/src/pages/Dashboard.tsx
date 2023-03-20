import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../services/api";
import { EventSchema } from "../types/events";

const Dashboard = () => {
  const [events, setEvents] = useState<EventSchema[]>([]);

  const eventCategory = (category: string) => {
    switch (category) {
      case "all":
        return "All";
      case "fullstack":
        return "Full Stack";
      case "frontend":
        return "Front-end";
      case "backend":
        return "Back-end";
      default:
        return "All";
    }
  };

  const getEvents = async () => {
    const response = await api.get("/dashboard");

    setEvents(response.data);
  };

  useEffect(() => {
    getEvents();
    console.log({ events });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header-height min-h-screen pb-5">
      <div
        className="grid grid-cols-1 min-[970px]:grid-cols-2 min-[1400px]:lg:grid-cols-3
      max-sm:m-2 max-sm:mt-12 m-16 gap-x-8"
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            userId={event.user}
            category={eventCategory(event.category)}
            image={event.thumbnail_url}
            title={event.title}
            description={event.description}
            date={event.date}
            place={event.place}
            price={event.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
