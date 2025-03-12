import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ModalProvider } from "./webcomponents/ModalContex";
import LoginModal from "./webcomponents/LoginModal";
import { Admin } from "./admin/Admin";
import FullScreenContent from "./components/FullScreenContent";
import AdminProfile from "./admin/AdminProfile";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [storedRole, setStoredRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLogin(true);
      setStoredRole(role);
    }
  }, []);

  function handleLoginSuccess(role, token) {
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
    setIsLogin(true);
    setStoredRole(role);
  }

  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLogin ? (
                storedRole === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <FullScreenContent />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isLogin && storedRole === "admin" ? (
                <Admin setIsLogin={setIsLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin-profile"
            element={
              isLogin && storedRole === "admin" ? (
                <AdminProfile />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* User Home */}
          <Route
            path="/home"
            element={
              isLogin && storedRole !== "admin" ? (
                <FullScreenContent />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <LoginModal
          setIsLogin={setIsLogin}
          onLoginSuccess={handleLoginSuccess}
        />
      </Router>
    </ModalProvider>
  );
}

export default App;
