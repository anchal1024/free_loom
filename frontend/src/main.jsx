import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Access/Login";
import Signup from "./Access/Signup";
import FreelancerDashboard from "./Dashboards/FreelancerDashboard";
import ClientDashboard from "./Dashboards/ClientDashboard";

import HomeF from "./Pages/HomeF"
import HomeC from "./Pages/HomeC"

import './Font'; // Import fonts
import "./index.css";
import Jobs from "./Pages/Jobs";
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false}/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<FreelancerDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />

          <Route path="/homef" element={<HomeF />} />
          <Route path="/homec" element={<HomeC />} />

        </Routes>
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
