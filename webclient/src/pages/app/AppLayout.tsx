import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

/**
 * Handling app layouts & pages.
 * @returns 
 */
const UserAppLayout:React.FC = () => {
    return(
        <main id="main-app-container">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><p className="text-sm font-medium">loading...</p></div>}>
                <Outlet />
            </Suspense>
        </main>
    )
}

export default UserAppLayout;