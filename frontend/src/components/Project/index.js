import { useEffect, useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
import "./index.css";
import ProjectTasks from "./ProjectTasks";
import ProjectBlueprints from "./ProjectBlueprints";
import { useAuth } from "../../contexts/authContext";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import PageHeader from "../PageHeader";

const Project = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`/projects/project/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
      .then((response) => {
        setProject(response.data.project);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [auth, id]);

  return (
    <>
      <PageHeader heading="project details" />

      <section className="project-section">
        <ProjectCarousel />

        <div className="project-info">
          <h1 className="p-info-header">{project?.name}</h1>
          <p className="p-info-manager">
            <span>Manager </span>
            {project?.manager.name}
          </p>
          <p className="p-info-price">{"₹ " + project?.price}</p>
          <p className="p-info-description">{project?.description}</p>
        </div>

        <div className="project-location">
          <img
            src="https://images.unsplash.com/photo-1584972191378-d70853fc47fc"
            alt="location"
          />
        </div>

        <div className="project-tasks">
          <h1>Tasks</h1>
          <ProjectTasks />
        </div>

        <div className="project-blueprints">
          <h1>Blueprints</h1>
          <ProjectBlueprints />
        </div>
      </section>
    </>
  );
};

export default Project;
