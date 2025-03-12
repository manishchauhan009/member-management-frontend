// Header.js
import React, { useContext } from 'react';
import { ModalContext } from './ModalContex';

function Header() {
  const { showModal } = useContext(ModalContext); 

  return (
    <header className="p-4 bg-blue-500 text-white">
      <h1>My Web Application</h1>
      <button onClick={showModal} className="mt-2 p-2 bg-white text-blue-500 rounded">
        Login
      </button>
    </header>
  );
}

export default Header;
