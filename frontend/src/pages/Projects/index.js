import React from "react";
import ProjectCards from "../../components/ProjectCards";
import Card from "../../components/ProjectCards/Card";
import CreateBtn from "../../components/Buttons/CreateBtn";
import "./index.css";
import DeleteBtn from "../../components/Buttons/DeleteBtn";
import EditBtn from "../../components/Buttons/EditBtn";
import { useModal } from "../../contexts/modalContext";

const Projects = () => {
  const { openModal } = useModal();

  return (
    <div className="projects-page">
      <div className="btn-placeholder">
        <CreateBtn
          text={"Create a ajkdjak"}
          onClick={() => openModal(<DeleteBtn text={"This is a modal"} />)}
        />
        <DeleteBtn text={"Delete thranfkjhf"} />
        <EditBtn text={"Edit andkahdjk"} />
      </div>

      <ProjectCards>
        <Card />
      </ProjectCards>
    </div>
  );
};

export default Projects;
