import './index.css'
import App from './App.tsx'
import "@fontsource-variable/bitcount/wght.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/dashboard.tsx";
import Login from "./pages/login.tsx";
import Patients from './pages/patients.tsx';
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
