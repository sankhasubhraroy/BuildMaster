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
        setProjects(response.data.users);
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
          <AccordionItem>
            <AccordionHeader>user</AccordionHeader>
            <AccordionPanel>details</AccordionPanel>
          </AccordionItem>
        </AccordionProvider>
      </div>
    )
  );
};

export default ProjectList;
