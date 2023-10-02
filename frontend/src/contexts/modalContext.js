import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen, modalContent }}
    >
      {children}
      <div className="modal-area">
        <AnimatePresence initial={false}>
          {isModalOpen && <Modal />}
        </AnimatePresence>
      </div>
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
