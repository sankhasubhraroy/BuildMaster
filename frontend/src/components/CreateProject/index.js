import { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    price: "",
    startDate: "",
    endDate: "",
    images: [],
  });

  let currentDate = new Date();
  currentDate = currentDate.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle multiple file inputs by converting FileList to an array
      const fileArray = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: fileArray,
      }));
    } else {
      // For other inputs, update the formData state as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="c-p">
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit} className="c-p-form">
        {/* name */}
        <div className="c-p-field">
          <label htmlFor="name" className="c-p-label">
            name of the project
          </label>

          <input
            id="name"
            className="c-p-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* country */}
        <div className="c-p-field">
          <label htmlFor="country" className="c-p-label">
            country
          </label>

          <input
            id="country"
            className="c-p-input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* state */}
        <div className="c-p-field">
          <label htmlFor="state" className="c-p-label">
            state
          </label>

          <input
            id="state"
            className="c-p-input"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* city */}
        <div className="c-p-field">
          <label htmlFor="city" className="c-p-label">
            city
          </label>

          <input
            id="city"
            className="c-p-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* pincode */}
        <div className="c-p-field">
          <label htmlFor="pincode" className="c-p-label">
            pincode
          </label>

          <input
            id="pincode"
            className="c-p-input"
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* price */}
        <div className="c-p-field">
          <label htmlFor="price" className="c-p-label">
            price
          </label>

          <input
            id="price"
            className="c-p-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* startDate */}
        <div className="c-p-field">
          <label htmlFor="startDate" className="c-p-label">
            starting date
          </label>

          <input
            id="startDate"
            className="c-p-input"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={currentDate}
          />
        </div>

        {/* endDate */}
        <div className="c-p-field">
          <label htmlFor="endDate" className="c-p-label">
            end date
          </label>

          <input
            id="endDate"
            className="c-p-input"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={currentDate}
          />
        </div>

        {/* images */}
        <div className="c-p-field c-p-file">
          <label htmlFor="images" className="c-p-label">
            select images
          </label>

          <input
            id="images"
            className="c-p-file-input"
            type="file"
            name="images"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleChange}
          />
        </div>

        <div className="c-p-field c-p-textarea">
          <label htmlFor="description" className="c-p-label">
            description
          </label>

          <textarea
            id="description"
            className="c-p-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="c-p-btn"
        >
          create project
        </motion.button>
      </form>
    </div>
  );
};

export default CreateProject;
