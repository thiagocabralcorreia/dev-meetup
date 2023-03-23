import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";

import api from "../services/api";
import FileInput from "../components/FileInput";
import Input from "../components/Input";
import Select from "../components/Select";

import { CategorySchema } from "../types/category";

const categories = [
  { value: "", name: "Select a category" },
  { value: "frontend", name: "Front-end" },
  { value: "backend", name: "Back-end" },
  { value: "fullstack", name: "Full Stack" },
  { value: "miscellaneous", name: "Miscellaneous" },
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [selected, setSelected] = useState<CategorySchema>(categories[0]);
  const [category, setCategory] = useState<string>(selected.value);
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const categoryHandler = async (selectedCategory: CategorySchema) => {
    setSelected(selectedCategory);
    setCategory(selectedCategory.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

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

        await api.post("/event", eventData, { headers: { user } });

        navigate("/");

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
          setErrorMessage("Please fill in all fields correctly.");
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
              maxLength={32}
              value={title}
              handleChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Description"
              id="description"
              name="description"
              maxLength={76}
              value={description}
              handleChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Place"
              id="place"
              name="place"
              value={place}
              maxLength={40}
              handleChange={(e) => setPlace(e.target.value)}
              required
            />
            <Input
              type="date"
              value={date}
              maxLength={100}
              handleChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Price"
              id="price"
              name="price"
              value={price}
              maxLength={5}
              handleChange={(e) => setPrice(e.target.value)}
              required
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <Select
                selected={selected}
                categories={categories}
                onChange={categoryHandler}
                className="flex justify-between h-11 rounded-3xl appearance-none relative w-full px-4 py-2 mb-4
                cursor-pointer bg-white placeholder-gray-600 text-gray-800 border border-gray-300
                focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm"
              />
            </motion.div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <button
              className="form-buttom btn-cancel"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
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
