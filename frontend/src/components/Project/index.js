import React from "react";
import ProjectCarousel from "./ProjectCarousel";
import "./index.css";
import ProjectAccordion from "./ProjectAccordion";
import ProjectTasks from "./ProjectTasks";
import ProjectBlueprints from "./ProjectBlueprints";

const Project = () => {
  return (
    <section className="project-section">
      <div className="project-upper-section">
        <div className="project-section-left">
          <ProjectCarousel />
        </div>

        <div className="project-section-right">
          <h1>Name of the Project</h1>
          <h4>Manager- hadjadjkhdajk</h4>
          <ProjectAccordion />
        </div>
      </div>

      <div className="project-lower-section">
        <div className="project-tasks-section">
          <h1>Tasks</h1>
          <ProjectTasks />
        </div>

        <div className="project-blueprints-section">
          <h1>Blueprints</h1>
          <ProjectBlueprints />
        </div>
      </div>
    </section>
  );
};

export default Project;
