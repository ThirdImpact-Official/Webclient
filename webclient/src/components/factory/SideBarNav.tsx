import React from "react"
import Header from "./Header";


type WrapperSidebarProps = {
  children: React.ReactNode
}

/**
 * A wrapper component for creating a sidebar in the app.
 * 
 * It renders a "Sidebar" label followed by the children components.
 * 
 * @param {React.ReactNode} children - The children components to be rendered inside the sidebar
 * @returns {React.ReactElement} The sidebar component
 */
const Sidebar: React.FC<WrapperSidebarProps> = ({ children }) => {
  return (
    <nav className=" ">
      
        <Header />
       

        <div className="h-full p-0 mt-4 ">
          {children}
        </div>
        
    </nav>
  );
};
export default Sidebar

/*
* Account user component right now serving as a placeholder Example.
  pruprose is to display user info in the nav bar
*/
const AccountUser = () => {
  return (
    <div className="border-b pb-4 items-center justify-center md:pb-2">
      <div>
        <img
          className="w-20 h-20 rounded-full "
          src="https://www.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg"
          alt="User Image"
        />
      </div>
      <div className="pt-2">
        <ul className="space-y-2">
          <li>
          <h1>Nom: John Doe</h1>
          </li>
        <li>
            <h1>Roles: Admin</h1>
        </li>
        <li>
            <h1>Organisation: FTL</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};