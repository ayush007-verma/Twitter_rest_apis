import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Error from "./pages/Error/Error";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Signin from "./pages/Signin/Signin";

const Layout = () => {
  return (
    <div className="w-50 mx-auto">
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/login",
        element: <Signin />,
      },
      {
        path: "/logout",
        element: <Signin />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
