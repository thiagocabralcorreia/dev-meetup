import { useState } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

import FileInput from "../components/FileInput";
import Input from "../components/Input";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const user_id = localStorage.getItem("user");

    const eventData = new FormData();

    eventData.append("title", title);
    eventData.append("description", description);
    eventData.append("price", price);
    eventData.append("place", place);
    eventData.append("date", date);
    eventData.append("thumbnail", thumbnail!);
    eventData.append("category", category);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        place !== "" &&
        date !== "" &&
        category !== "" &&
        thumbnail !== null
      ) {
        console.log("Event has been sent");

        await api.post("/event", eventData, { headers: { user_id } });

        console.log(eventData);
        navigate("/dashboard");

        setIsSubmitting(false);
        setTitle("");
        setDescription("");
        setPrice("");
        setThumbnail(null);
        setCategory("");
        setPlace("");
        setDate("");
      } else {
        setTimeout(() => {
          setErrorMessage("Unable to create event.");
        }, 2000);
        setIsSubmitting(false);
      }
    } catch (error) {
      Promise.reject(error);
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form w-4/5 md:w-[800px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
        >
          <h1 className="form-title mb-10">Create your Event</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <Input
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              value={title}
              handleChange={(e) => setTitle(e.target.value)}
              isRequired
            />
            <Input
              type="text"
              placeholder="Description"
              id="description"
              name="description"
              value={description}
              handleChange={(e) => setDescription(e.target.value)}
              isRequired
            />
            <Input
              type="text"
              placeholder="Place"
              id="place"
              name="place"
              value={place}
              handleChange={(e) => setPlace(e.target.value)}
              isRequired
            />
            <Input
              type="date"
              value={date}
              handleChange={(e) => setDate(e.target.value)}
              isRequired
            />
            <Input
              type="text"
              placeholder="Price"
              id="price"
              name="price"
              value={price}
              handleChange={(e) => setPrice(e.target.value)}
              isRequired
            />
            <select
              className="h-11 rounded-3xl appearance-none relative block w-full px-4 py-2 mb-4
              bg-white placeholder-gray-600 text-gray-800 border border-gray-300
              focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="frontend">Front-end</option>
              <option value="backend">Back-end</option>
              <option value="fullstack">Fullstack</option>
            </select>
          </div>

          <div>
            <FileInput
              onFileSelect={(file: File) => setThumbnail(file)}
              isSubmitting={isSubmitting}
            />
          </div>
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
          <div className="md:w-[62.5%] justify-center m-auto">
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
                "Create Event"
              )}
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default CreateEvent;
