import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
//pages.
import Login from "@/pages/auth/login/Login";
import Logout from './app/Logout';
import UserAppLayout from "@/pages/app/AppLayout";
import Home from "./vitrine/Home";
import Contact from "./app/Contact";
import Dashboard from "./app/Dashboard";
import AuthLayout from "@/components/app/Layout/AuthLayout";
import DashboardLayout from "@/components/app/Layout/MainLayout";
import { Layout } from "@/components/app/Layout/Layout";
import Organisation from "./app/Organisation";
import Notification from "./app/Notification";
import UserOrganisation from "./app/UserOrganisation";
import EscapeGame from "./app/Escapgame";
import VerifyEmail from "./auth/VerifyEmail";
import NotFound from "./app/NotFound";
import Session from "./app/Session";
import Reservation from "./app/Reservation";
import FAQ from "./app/FAQ";
import Statistic from "./app/Statistic";
import Event from "./app/Event";
import ActivityPlacePage from "./app/ActivityPlace";
import Profile from "@/pages/app/Profile";
import EscapegamcategoriesPage from '@/pages/app/EscapegameCategories'
import { useAuth } from "@/context/AuthContext";
import ResetPassWordComponent from "./auth/ResetPassWordMail";
import Rating from "./app/Rating";
import { SignalCellularConnectedNoInternet0BarTwoTone } from "@mui/icons-material";
import{Card,CardContent} from "@mui/material"
import Signalement from "./app/Signalement";
// Composant pour protéger les routes privées
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  if (auth.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Composant pour les routes publiques (redirection si connecté)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  if (auth.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

/**
 * Webclient app entry point.
 */
const App: React.FC = () => {
  const auth = useAuth();

  // Affichage du loader pendant l'initialisation
  if (auth.isLoading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress size={60} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="">
      <Routes>
        {/* Routes protégées - nécessitent une authentification */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<UserAppLayout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<Profile />} />
          <Route path="organisation" element={<Organisation />} />
          <Route path="organisation/user" element={<UserOrganisation />} />
          <Route path="escapegame" element={<EscapeGame />} />
          <Route path="escapegame/:id/session" element={<Session />} />
          <Route path="escapegame/:esgId/rating" element={<Rating />} />
          <Route path="escapegame/:esgId/session/:id/reservation" element={<Reservation/>} />
          <Route path="escapegame/:esgId/reservation" element={<Reservation/>} />
          <Route path="escapegame/:id/event" element={<Event />} />
          <Route path="escapegame/:id/activity" element={<ActivityPlacePage />} />
          <Route path="escapegame/:id/categories" element={<EscapegamcategoriesPage/>} />
          <Route path="faq" element={<FAQ />} />
          <Route path="signalement" element={<Signalement />} />
          <Route path="VerifyEmail" element={<VerifyEmail />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="logout" element={<Logout />}/>
        </Route>

        {/* Routes d'authentification - disponibles uniquement si non connecté */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="verify" element={<VerifyEmail />} />
          <Route path="reset" element={<ResetPassWordComponent />}/>
        </Route>

        {/* Routes publiques */}
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>

        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default App;