import { useAuth } from '@/context/AuthContext';
import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
/**
 * Dashboard component that renders a simple dashboard view.
 * It displays a paragraph with the text "Dashboard".
 * @returns {React.ReactElement} A div containing the dashboard content.
 */

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Dashboard</p>
      </div>
    );
  }

  return null;
};

export default Dashboard;