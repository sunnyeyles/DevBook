import { useState } from "react";
import "./App.scss";
import Layout from "./components/Layout/Layout";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./components/SignInPage/SignInPage";
import Home from "./components/Home/Home";

function App() {
  const currentUser = true;

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },

    {
      path: "/login",
      element: <SignInPage />,
    },
  ]);

  return (
    <div className="App">
      {/* <Layout /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

