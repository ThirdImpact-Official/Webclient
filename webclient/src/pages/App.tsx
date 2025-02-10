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
    <div className="w-full pt-10 flex items-center justify-center">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<UserAppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App;