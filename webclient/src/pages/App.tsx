import React from "react";
import { Routes, Route } from "react-router-dom";
//pages.
import Login from "@/pages/login/Login";
import UserAppLayout from "@/pages/app/AppLayout";
import Home from "./app/Home";
import  Contact from "./app/Contact";
import Dashboard from "./app/Dashboard";
import AuthLayout from "@/components/app/Layout/AuthLayout";
import DashboardLayout from "@/components/app/Layout/MainLayout";
import { Layout } from "@/components/app/Layout/Layout";


/**
 * Webclient app entry point.
 * @returns 
 */
const App:React.FC = () => {
  return(
    <div className="h-full flex items-center justify-center">
        <Routes>
          {/* Route avec Layout principal */}
          <Route path="/" element={<DashboardLayout/>}>
            <Route index element={<Dashboard />} />
            <Route path="user" element={<UserAppLayout />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Route Login (sans sidebar) */}
          <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />    
          </Route>

          {/* Redirection vers Home si la route est inconnue */}
          <Route element={<Layout />} >
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </div>
  )
};

export default App;