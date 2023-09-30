import { useEffect, useState } from "react";
import ProjectCards from "../../components/ProjectCards";
import Card from "../../components/ProjectCards/Card";
import CreateBtn from "../../components/Buttons/CreateBtn";
import "./index.css";
import { useModal } from "../../contexts/modalContext";
import CreateProject from "../../components/CreateProject";
import axios from "../../api/axios";
import { useAuth } from "../../contexts/authContext";
// import { useNotification } from "../../contexts/notificationContext";

const Projects = () => {
  const { openModal } = useModal();
  const { auth } = useAuth();
  const [projects, setProjects] = useState([]);
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
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [auth]);

  return (
    <div className="projects-page">
      <div className="btn-placeholder">
        <CreateBtn
          text={"create a new project"}
          onClick={() => openModal(<CreateProject />)}
        />
      </div>

      {projects.length !== 0 && (
        <ProjectCards>
          {projects.map((project, index) => (
            <Card
              key={index}
              projectId={project._id}
              name={project.name}
              description={project.description}
            />
          ))}
        </ProjectCards>
      )}
    </div>
  );
};

export default Projects;
