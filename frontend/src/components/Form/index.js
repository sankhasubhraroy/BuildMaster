import { Children, cloneElement, useState } from "react";
import "./index.css";

const Form = ({ onSubmit, children }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        {Children.map(children, (child) =>
          cloneElement(child, {
            onChange: handleChange,
            value: formData[child.props.name] || "",
          })
        )}
      </form>
      <button type="submit">Submit</button>
    </>
  );
};

export default Form;
