import { useEffect, useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
import "./index.css";
import ProjectTasks from "./ProjectTasks";
import ProjectBlueprints from "./ProjectBlueprints";
import { useAuth } from "../../contexts/authContext";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../PageHeader";
import EditBtn from "../Buttons/EditBtn";
import CreateBtn from "../Buttons/CreateBtn";
import BackBtn from "../Buttons/BackBtn";
import { useModal } from "../../contexts/modalContext";
import CreateTasks from "../CreateTasks";
import EditProject from "../EditProject";
import DeleteBtn from "../Buttons/DeleteBtn";
import DeleteProject from "../DeleteProject";
import Map from "../Map";
import UploadBtn from "../Buttons/UploadBtn";
import UploadBlueprint from "../UploadBuleprint";

const Project = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openModal } = useModal();
  const navigate = useNavigate();

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
            <BackBtn
              text="Back to projects"
              onClick={() => navigate("/projects")}
            />
            <EditBtn
              text="Edit project"
              onClick={() =>
                openModal(<EditProject projectId={id} data={project} />)
              }
            />
            <DeleteBtn
              text="delete project"
              onClick={() => openModal(<DeleteProject projectId={id} />)}
            />
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
            {project.coordinates && (
              <Map
                coordinates={{
                  lat: project.coordinates.latitude,
                  lng: project.coordinates.longitude,
                }}
              />
            )}
            {!project.coordinates && (
              <div className="p-map-fetch">
                <p>looks like you don't provide any location</p>
              </div>
            )}
          </div>

          <div className="project-tasks">
            <h1>Tasks</h1>

            {project?.tasks.length !== 0 && (
              <ProjectTasks tasks={project.tasks} />
            )}

            {project?.tasks.length === 0 && (
              <div className="p-no-tasks">
                <p>currently you have not created any task, create a new one</p>
              </div>
            )}

            <div className="btn-place">
              <CreateBtn
                text="Create Task"
                onClick={() => openModal(<CreateTasks projectId={id} />)}
              />
            </div>
          </div>

          <div className="project-blueprints">
            {project.blueprints ? (
              <ProjectBlueprints blueprints={project.blueprints} />
            ) : (
              <p>Start uploading blueprints</p>
            )}
          </div>

          <div className="btn-place">
            <UploadBtn
              text="Upload blueprint"
              onClick={() => openModal(<UploadBlueprint projectId={id} />)}
            />
          </div>
        </section>
      </>
    )
  );
};

export default Project;
