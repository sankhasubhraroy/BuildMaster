import { useEffect, useState } from "react";
import { AccordionProvider } from "../../contexts/accordionContext";
import { AccordionHeader, AccordionItem, AccordionPanel } from "../Accordion";
import axios from "../../api/axios";

const TaskList = () => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTasks(response.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    !isLoading && (
      <div className="d-l">
        <h1>Tasks List</h1>

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

export default TaskList;
