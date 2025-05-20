import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Safety } from "../components/Safety";
// import CreateDoc from "../components/Create-Doc/CreateDoc";
import CreateQues from "../components/CreateQues/CreateQues";
// import { Report } from "../components/Report";
import MainLayout from "../layout/Layout";
import DashBoard from "../pages/DashBoard";
import DocumentManagement from "../pages/DocumentManagement";
import DocumentManagementTable from "../pages/DocumentManagementTable";
import IncidentReporting from "../pages/IncidentReporting";
import SafetyTraining from "../pages/SafetyTraining";
import UserManagement from "../pages/UserManagement";
// import ManageCategories from "../components/ManageCategories/ManageCategories";
// import SafetyTrainnigCategories from "../components/SafetyTrainnigCategories/SafetyTrainnigCategories";
import LoginPage from "../components/Login/LoginPage";
import IncidentReportingSpecificPage from "../pages/IncidentReportingSpecificPage";
import ProtectedRoute from "./private";
import AuthRoute from "./AuthRoute";
import LandingPage from "../pages/landing_comp/LandingPage";

const router = createBrowserRouter([
  {
    element: <AuthRoute />, // ✅ Wrap LandingPage inside AuthRoute
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          { path: "", element: <DashBoard /> },
          { path: ":year", element: <DashBoard /> },
        ],
      },
      {
        path: "document-management",
        element: <MainLayout />,
        children: [
          { path: "", element: <DocumentManagement /> },
          { path: "user", element: <DocumentManagementTable /> },
        ],
      },
      {
        path: "safety-training",
        element: <MainLayout />,
        children: [
          { path: "", element: <SafetyTraining /> },
          { path: "user", element: <DocumentManagementTable /> },
        ],
      },
      {
        path: "incident-reporting",
        element: <MainLayout />,
        children: [{ path: "", element: <IncidentReporting /> }],
      },
      {
        path: "user-management",
        element: <MainLayout />,
        children: [{ path: "", element: <UserManagement /> }],
      },
      {
        path: "new-doc",
        element: <CreateQues />,
      },
    ],
  },
  {
    path: "/incident-reporting",
    element: <MainLayout />,
    children: [
      { path: "", element: <IncidentReporting /> },
      { path: "IncidentId", element: <IncidentReportingSpecificPage /> },
    ],
  },
  {
    path: "user-management",
    element: <MainLayout />,
    children: [{ path: "", element: <UserManagement /> }],
  },
  {
    path: "/new-doc",
    element: <CreateQues />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export { router, AppRoutes };
