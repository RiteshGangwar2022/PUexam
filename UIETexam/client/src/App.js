import Home from "./components/controller1/options/Home";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Examiners from "./components/controller1/options/Examiners";
import Papers from "./components/controller1/options/Papers";
import Payments from "./components/controller1/options/Payments";
import Logout from "./components/controller1/options/Logout";
import Examinerhome from "./components/Examiner/options/Home";
import ExaminerAssignments from "./components/Examiner/options/Assignments";
import ExaminerQuestionBank from "./components/Examiner/options/QuestionBanks";
import ExaminerPayments from "./components/Examiner/options/Payments";
import ExaminerLogouts from "./components/Examiner/options/Logout";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className=" bg-sky-300  h-screen flex-col flex justify-center items-center text-black">
        <p className=" font-bold  text-5xl "> welcome !</p>
        <p className=" underline text-red-900 text-sm ">
          add middleware to redirect user from this page
        </p>
        <Link
          className=" bg-neutral-500 text-white px-2 py-1 my-2"
          to={"/controller1/Home"}
        >
          <p>controller</p>
        </Link>
      </div>
    ),
  },
  {
    path: "/controller1/Home",
    element: <Home />,
  },
  {
    path: "/controller1/Examiners",
    element: <Examiners />,
  },
  {
    path: "/controller1/Papers",
    element: <Papers />,
  },
  {
    path: "/controller1/Payments",
    element: <Payments />,
  },
  {
    path: "/controller1/Logout",
    element: <Logout />,
  },

  {
    path: "/Examiner/Home",
    element: <Examinerhome />,
  },
  {
    path: "/Examiner/Assignments",
    element: <ExaminerAssignments />,
  },
  {
    path: "/Examiner/Logout",
    element: <ExaminerLogouts />,
  },
  {
    path: "/Examiner/Payments",
    element: <ExaminerPayments />,
  },
  {
    path: "/Examiner/QuestionBanks",
    element: <ExaminerQuestionBank />,
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
