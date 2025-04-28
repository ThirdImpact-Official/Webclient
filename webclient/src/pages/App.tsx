import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//pages.
import Login from "@/pages/auth/login/Login";
import UserAppLayout from "@/pages/app/AppLayout";
import Home from "./vitrine/Home";
import  Contact from "./app/Contact";
import Dashboard from "./app/Dashboard";
import AuthLayout from "@/components/app/Layout/AuthLayout";
import DashboardLayout from "@/components/app/Layout/MainLayout";
import { Layout } from "@/components/app/Layout/Layout";
import Organisation from "./app/Organisation";
import Notification from "./app/Notification";
import UserOrganisation from "./app/UserOrganisation";
import EscapeGame from "./app/Escapgame";
import VerifyEmail from "./app/VerifyEmail";
import NotFound from "./app/NotFound";
import Session from "./app/Session";
import Reservation from "./app/Reservation";
import FAQ from "./app/FAQ";
import Statistic from "./app/Statistic";
import Event from "./app/Event";
import ActivityPlacePage from "./app/ActivityPlace";
import Profile from "@/pages/app/Profile";
import { useAuth } from "@/context/AuthContext";

/**
 * Webclient app entry point.
 * @returns 
 */
const App: React.FC = () => {
  //context application

  const auth= useAuth();
  const [authenticatedUser,setAuthenticated]=useState(auth.isAuthenticated);
  
  if(!authenticatedUser){
      console.log("you're not logged");
  }

  return (
    <section className="">
      <Routes>
       
          <>
           <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="user" element={<UserAppLayout />} />
              <Route path="contact" element={<Contact />} />
              <Route path="notification" element={<Notification />} />
              <Route path="profile" element={<Profile />} />
              <Route path="organisation" element={<Organisation />} />
              <Route path="organisation/user/:id" element={<UserOrganisation />} />
              <Route path="escapegame/:id" element={<EscapeGame />} />
              <Route path="escapegame/:id/session" element={<Session />} />
              <Route path="escapegame/:id/session/:id/reservation" element={<Reservation/>} />
              <Route path="escapegame/:id/event" element={<Event />} />
              <Route path="escapegame/:id/activity" element={<ActivityPlacePage />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="statistic" element={<Statistic />} />
              <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
            </Route>

            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="*" element={<Navigate to="/home" replace/>}/>
            </Route>
          </>
        
          <>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
            </Route>

            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/verify" element={<VerifyEmail />} />
              
            </Route>
          </>
      
        <Route path="*" element={<NotFound />} />
     
      </Routes>
    </section>
  );
};

export default App;