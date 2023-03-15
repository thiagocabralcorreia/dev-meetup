import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";

const CreateEvent = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            {/* <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          <img
            src={cameraIcon}
            style={{ maxWidth: "50px" }}
            alt="upload icon image"
          /> */}
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
              focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
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

          <div className="w-[62.5%] justify-center m-auto">
            <button type="submit" className="form-buttom">
              Create Event
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default CreateEvent;
