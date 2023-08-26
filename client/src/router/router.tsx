import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import Categories, { categoriesAction, categoryLoader } from "../pages/Categories";
import Auth from "../pages/Auth";
import Protected from "../components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "transactions",
        element: (
          <Protected>
            <Transactions />
          </Protected>
        ),
      },
      {
        path: "categories",
        action:categoriesAction,
        loader:categoryLoader,
        element: (
          <Protected>
            <Categories />
          </Protected>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);
