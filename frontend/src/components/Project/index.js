import { useEffect, useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
import "./index.css";
import ProjectTasks from "./ProjectTasks";
import ProjectBlueprints from "./ProjectBlueprints";
import { useAuth } from "../../contexts/authContext";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import PageHeader from "../PageHeader";
import EditBtn from "../Buttons/EditBtn";
import CreateBtn from "../Buttons/CreateBtn";
import BackBtn from "../Buttons/BackBtn";

const Project = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [auth, id]);

  return (
    !isLoading && (
      <>
        <PageHeader heading="project details" />

        <section className="project-section">
          <div className="btn-place">
            <BackBtn text="Back to projects" />
            <EditBtn text="Edit project" />
          </div>

          <ProjectCarousel images={project.images} />

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

            {project?.tasks.length !== 0 && <ProjectTasks />}

            {project?.tasks.length === 0 && (
              <div className="p-no-tasks">
                <p>currently you have not created any task, create a new one</p>
              </div>
            )}

            <div className="btn-place">
              <CreateBtn text="Create Task" />
            </div>
          </div>

          <div className="project-blueprints">
            <h1>Blueprints</h1>
            <ProjectBlueprints />
          </div>
        </section>
      </>
    )
  );
};

export default Project;
