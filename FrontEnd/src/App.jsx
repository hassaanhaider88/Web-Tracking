import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";
import ProjectDetail from "./pages/ProjectDetail";
import { useAuthStore } from "./store/auth";
import HomePage from "./pages/Home";
import MyDashboard from "./pages/MyDashboard";
import ContactUs from "./pages/ConatactUs";
import AboutUs from "./pages/AboutUs";
import FoutZeroFour from "./pages/FoutZeroFour";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./Components/PageTransition";
import Blogs from "./pages/Blogs";
import DontionPage from "./pages/Donation";

function Protected({ children }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <Protected>
                <MyDashboard />
              </Protected>
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactUs />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutUs />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blogs />
            </PageTransition>
          }
        />
        <Route
          path="/donate"
          element={
            <PageTransition>
              <DontionPage />
            </PageTransition>
          }
        />
        <Route
          path="/projects/new"
          element={
            <PageTransition>
              <Protected>
                <NewProject />
              </Protected>
            </PageTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PageTransition>
              <Protected>
                <ProjectDetail />
              </Protected>
            </PageTransition>
          }
        />
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <FoutZeroFour />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
