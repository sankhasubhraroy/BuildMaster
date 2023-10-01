import { useEffect, useState } from "react";
import ProjectCards from "../../components/ProjectCards";
import Card from "../../components/ProjectCards/Card";
import CreateBtn from "../../components/Buttons/CreateBtn";
import { useModal } from "../../contexts/modalContext";
import CreateProject from "../../components/CreateProject";
import axios from "../../api/axios";
import { useAuth } from "../../contexts/authContext";
import PageHeader from "../../components/PageHeader";
import "./index.css";
import BackBtn from "../../components/Buttons/BackBtn";
import { useNavigate } from "react-router-dom";
// import { useNotification } from "../../contexts/notificationContext";

const Projects = () => {
  const { openModal } = useModal();
  const { auth } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // const { addNotification } = useNotification();

  // Call the notification on success
  // const handleSuccess = (message) => {
  //   addNotification({
  //     type: "success",
  //     message: message,
  //   });
  // };

  // Call the notification on failure
  // const handleFailure = useCallback(
  //   (message) => {
  //     addNotification({
  //       type: "error",
  //       message: message,
  //     });
  //   },
  //   [addNotification]
  // );

  useEffect(() => {
    axios
      .get(`/projects/project`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
      .then((response) => {
        setProjects(response.data.projects);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [auth]);

  return (
    !isLoading && (
      <>
        <PageHeader heading="projects" />

        <div className="projects-page">
          <div className="btn-placeholder">
            <BackBtn
              text="back to profile"
              onClick={() => navigate("/profile")}
            />

            <CreateBtn
              text={"create a new project"}
              onClick={() => openModal(<CreateProject />)}
            />
          </div>

          {projects.length !== 0 && (
            <div className="latest-projects">
              <h1>latest projects</h1>
            </div>
          )}

          {projects.length !== 0 && (
            <ProjectCards>
              {projects.map((project, index) => (
                <Card
                  key={index}
                  projectId={project._id}
                  name={project.name}
                  price={project.price}
                  description={project.description}
                  images={project.images}
                />
              ))}
            </ProjectCards>
          )}

          {projects.length === 0 && (
            <div className="no-projects">
              <p>You don't have any projects</p>
              <p>Start creating your first project</p>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default Projects;
