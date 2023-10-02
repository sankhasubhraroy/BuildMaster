import { useEffect, useState } from "react";
import { AccordionProvider } from "../../contexts/accordionContext";
import { AccordionHeader, AccordionItem, AccordionPanel } from "../Accordion";
import { AiFillDelete } from "react-icons/ai";
import axios from "../../api/axios";
import { useModal } from "../../contexts/modalContext";
import DeleteUser from "../DeleteUser";

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    axios
      .get("/user", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    !isLoading && (
      <div className="d-l">
        <h1>Users List</h1>

        <AccordionProvider>
          {users.map((user, id) => (
            <AccordionItem key={id}>
              <AccordionHeader>
                <div className="li-head">
                  <img className="li-avatar" src={user.avatar} alt="avatar" />
                  {user.name}
                </div>
              </AccordionHeader>
              <AccordionPanel>
                <div className="li-panel">
                  <p>
                    Username<span>{user.username}</span>
                  </p>
                  <p>
                    Email<span>{user.email}</span>
                  </p>
                  <p>
                    Phone<span>{user.phone}</span>
                  </p>
                </div>
                <button
                  className="li-btn"
                  onClick={() => openModal(<DeleteUser id={user._id} />)}
                >
                  <AiFillDelete />
                </button>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </AccordionProvider>
      </div>
    )
  );
};

export default UserList;
