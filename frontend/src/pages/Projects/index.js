import React from "react";
import ProjectCards from "../../components/ProjectCards";
import Card from "../../components/ProjectCards/Card";
import CreateBtn from "../../components/Buttons/CreateBtn";
import "./index.css";
import { useModal } from "../../contexts/modalContext";
import CreateProject from "../../components/CreateProject";

const Projects = () => {
  const { openModal } = useModal();

  return (
    <div className="projects-page">
      <div className="btn-placeholder">
        <CreateBtn
          text={"Create a ajkdjak"}
          onClick={() => openModal(<CreateProject />)}
        />
      </div>

      <ProjectCards>
        <Card />
      </ProjectCards>
    </div>
  );
};

export default Projects;
