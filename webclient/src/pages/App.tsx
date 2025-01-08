import React from "react";
import { Routes, Route } from "react-router-dom";

//pages.
import Login from "@/pages/login/Login";
import UserAppLayout from "@/pages/app/AppLayout";
import Home from "./app/Home";

/**
 * Webclient app entry point.
 * @returns 
 */
const App:React.FC = () => {
  return(
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="" element={<UserAppLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App;