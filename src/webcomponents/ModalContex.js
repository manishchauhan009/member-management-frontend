import React, { createContext, useState } from 'react';

// Create the Context
export const ModalContext = createContext();

// Provider Component
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // Track login/register

  // Functions to control the modal
  const showModal = (type) => {
    setModalType(type); // Set the type of modal (login or register)
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalType(null); // Reset modal type when closing
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalType, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
