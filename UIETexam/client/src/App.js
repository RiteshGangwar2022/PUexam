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
import AssignmentInterface from "./components/Examiner/AssignmentInterface"
import Login from "./components/auth/Login";
import QuestionBankInterface from "./components/Examiner/QuestionBankInterface";
import MyContextProvider from "./Context/MyContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login/>,
  
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
    path: "/Examiner/Assignments/:id",
    element:<AssignmentInterface/>,
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
  {
    path: "/Examiner/QuestionBanks/:id",
    element: <QuestionBankInterface/>,
  },
 
]);

function App() {
  return (
    <MyContextProvider>
      <RouterProvider router={router} />
    </MyContextProvider>
      
    
  );
}

export default App;
