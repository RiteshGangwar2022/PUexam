import Home from './components/controller1/options/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Examiners from "./components/controller1/options/Examiners";
import Papers from "./components/controller1/options/Papers";
import Payments from "./components/controller1/options/Payments";
import Logout from "./components/controller1/options/Logout";
const router = createBrowserRouter([
  {
    path: "/controller1/Home",
    element: <Home/>,
  },
  {
    path: "/controller1/Examiners",
    element: <Examiners/>,
  },
  {
    path: "/controller1/Papers",
    element: <Papers/>,
  },
  {
    path: "/controller1/Payments",
    element: <Payments/>,
  },
  {
    path: "/controller1/Logout",
    element: <Logout/>,
  },
]);

function App() {
  return (
    <>
       <RouterProvider router={router} />
    
    </>
  );
}

export default App;
