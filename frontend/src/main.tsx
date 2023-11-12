import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Dashboard from "./components/admin/dashboard";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import BookDetails from "./components/admin/bookdetails.tsx";
import AddBook from "./components/admin/forms/add-book.tsx";
import BatchDetails from "./components/admin/batchdetails.tsx";
import Home from "./components/college/home.tsx";
import College from "./components/college/college.tsx";
import About from "./components/college/about.tsx";
import Contact from "./components/college/contact.tsx";
import IssueBook from "./components/admin/issuebook.tsx";
import PendingApproval from "./components/admin/pendingapproval.tsx";
import UserHome from "./components/user/home.tsx";
import YourBook from "./components/user/yourbook.tsx";
import DisplayBook from "./components/user/displaybook.tsx";
import Login from "./components/login/login.tsx";
import PrivateRoute from "./privateroute.tsx";
import { isAuthenticate } from "./components/services/authservice.ts";
import Logout from "./components/login/logout.tsx";
import Notification from "./components/user/notification.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="college/home" />,
  },
  {
    path: "college",
    element: <College />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "library",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoute isAuthenticated={isAuthenticate}>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "book-details",
        element: (
          <PrivateRoute isAuthenticated={isAuthenticate}>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "book-details/add/:bookId?",
        element: (
          <PrivateRoute isAuthenticated={isAuthenticate}>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "batch-details",
        element: (
          <PrivateRoute isAuthenticated={isAuthenticate}>
            <BatchDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "issue-book",
        element: (
          <PrivateRoute isAuthenticated={isAuthenticate}>
            <IssueBook />
          </PrivateRoute>
        ),
      },
      {
        path: "pending-approval",
        element: (
          <PrivateRoute isAuthenticated={isAuthenticate}>
            <PendingApproval />
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        children: [
          {
            path: "home",
            element: (
              <PrivateRoute isAuthenticated={isAuthenticate}>
                <UserHome />
              </PrivateRoute>
            ),
          },
          {
            path: "home/:type",
            element: (
              <PrivateRoute isAuthenticated={isAuthenticate}>
                <DisplayBook />
              </PrivateRoute>
            ),
          },
          {
            path: "your-book",
            element: (
              <PrivateRoute isAuthenticated={isAuthenticate}>
                <YourBook />
              </PrivateRoute>
            ),
          },
          {
            path: "notification",
            element: (
              <PrivateRoute isAuthenticated={isAuthenticate}>
                <Notification />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
