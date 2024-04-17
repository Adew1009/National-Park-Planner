import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import VeteranPage from "./pages/Veteran.jsx";
import AParkPage from "./pages/AParkPage.jsx";
import NationalParksPage from "./pages/NationalParks.jsx";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import { userConfirmation } from "./utilities";
import ParksByStatePage from "./pages/ParksByState.jsx";
import ParkWishListPage from "./pages/ParkWishListPage.jsx";
import VisitedParksPage from "./pages/VisitedParksPage.jsx";
// import "./data/national_parks.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "veteran/",
        element: <VeteranPage />,
      },
      {
        path: "park/:name/:code",
        element: <AParkPage />,
      },
      {
        path: "allparks",
        element: <NationalParksPage />,
      },
      {
        path: "visitedparks",
        element: <VisitedParksPage />,
      },
      {
        path: "wishparks",
        element: <ParkWishListPage />,
      },
      {
        path: "/signup/",
        element: <SignUp />,
      },
      {
        path: "/login/",
        element: <LogIn />,
      },
      {
        path: "/parksbystate/:statename/:state",
        element: <ParksByStatePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
]);
export default router;
