import { AccordionProvider } from "../../contexts/accordionContext";
import { useModal } from "../../contexts/modalContext";
import { AccordionHeader, AccordionItem, AccordionPanel } from "../Accordion";
import { FiEdit } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import EditTask from "../EditTask";
import DeleteTask from "../DeleteTask";

const ProjectTasks = ({ tasks }) => {
  const { openModal } = useModal();

  return (
    <div>
      <AccordionProvider>
        {tasks.map((task, index) => (
          <AccordionItem key={index}>
            <AccordionHeader>{task.name}</AccordionHeader>
            <AccordionPanel>
              <div className="t-container">
                <p className="t-description">{task.description}</p>
                <p className="t-deadline">
                  <span>deadline</span>
                  {task.deadline.split("T")[0]}
                </p>
                <p className="t-status">
                  <span>status</span>
                  {task.status}
                </p>
                <div className="t-assignees">
                  <p>assignees</p>
                  {task.assignees.map((assignee, index) => (
                    <li key={index}>{assignee}</li>
                  ))}
                </div>

                <div className="t-btn-holder">
                  <button
                    className="t-btn"
                    onClick={() =>
                      openModal(<EditTask taskId={task._id} data={task} />)
                    }
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="t-btn"
                    onClick={() => openModal(<DeleteTask taskId={task._id} />)}
                  >
                    <IoTrashBin size={18} />
                  </button>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </AccordionProvider>
    </div>
  );
};

export default ProjectTasks;
