import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "./ModalContex";
import axios from "axios";
import RegisterForm from "./RegisterForm";

function LoginModal(props) {
  const { isOpen, hideModal } = useContext(ModalContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "admin",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const hideModalAndReset = () => {
    hideModal(); // Close the modal
    setIsRegister(false); // Reset register state to show login form next time
  };

  useEffect(() => {
    if (isOpen) {
      setIsRegister(false); // Reset register state when modal opens
      setCredentials({
        username: "",
        password: "",
        role: "user",
      });
    }
  }, [isOpen]);


  const loginHandler = () => {
    console.log(credentials);
    const { username, password } = credentials;

    if (!username || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/user/login", credentials)
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          const { token, role } = response.data;
          props.onLoginSuccess(role, token);
          alert("Login Successful");
          hideModal();
        } else {
          alert(response.data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error during login:", error);
        alert(
          error.response?.data?.message || "An error occurred. Please try again."
        );
      });
  };

  const toggleRegister = () => setIsRegister(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="relative p-6  w-[90%] max-w-[40rem] max-h-[90vh] overflow-y-auto">
       

        {isRegister ? (
          <RegisterForm hideModal={hideModal} />
        ) : (
          <div className="p-4 md:p-6 rounded-lg bg-white shadow-lg">
             <button
          onClick={hideModalAndReset} // Use the new function
          className="absolute top-6 right-6 md:top-8 md:right-8 text-gray-600 hover:text-red-500 text-3xl font-bold transition duration-300 z-50"
          aria-label="Close modal"
        >
          &times;
        </button>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={credentials.role}
                onChange={(e) =>
                  setCredentials({ ...credentials, role: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={loginHandler}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <button
                className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
                onClick={toggleRegister}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
