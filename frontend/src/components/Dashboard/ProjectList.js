import { useEffect, useState } from "react";
import { AccordionProvider } from "../../contexts/accordionContext";
import { AccordionHeader, AccordionItem, AccordionPanel } from "../Accordion";
import axios from "../../api/axios";

const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/projects", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProjects(response.data.projects);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    !isLoading && (
      <div className="d-l">
        <h1>Projects List</h1>

        <AccordionProvider>
          {projects.map((project, index) => (
            <AccordionItem key={index}>
              <AccordionHeader>{project.name}</AccordionHeader>
              <AccordionPanel>
                <div className="li-panel">
                  <p>
                    Description<span>{project.description}</span>
                  </p>
                  <p>
                    Location<span>{project.location.city}</span>
                  </p>
                  <p>
                    Price<span>{project.price}</span>
                  </p>
                  <p>
                    Status<span>{project.status}</span>
                  </p>
                  <p>
                    Manager<span>{project.manager}</span>
                  </p>
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </AccordionProvider>
      </div>
    )
  );
};

export default ProjectList;
