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
        setTasks(response.data.tasks);
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
          {tasks.map((task, index) => (
            <AccordionItem key={index}>
              <AccordionHeader>{task.name}</AccordionHeader>
              <AccordionPanel>
                <div className="li-panel">
                  <p>
                    Description<span>{task.description}</span>
                  </p>
                  <p>
                    Status<span>{task.status}</span>
                  </p>
                  <p>
                    Manager<span>{task.manager}</span>
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

export default TaskList;
