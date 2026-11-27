import { createBrowserRouter } from "react-router";
import TaskForm from "./Pages/Home/TaskForm";
import AllActivities from "./Pages/AllActivities";
import Profile from "./Pages/Profile";
import TodayTask from "./Pages/TodayTask";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Root from "./Root/Root";
const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Root></Root></PrivateRoute>,
        children: [
            {
                index: true,
                Component: TaskForm

            },

            {
                path: "/all-activities",
                Component: AllActivities
            },
            {
                path: "/profile",
                Component: Profile
            }
        ]

    }, {
        path: "/sign-up",
        Component: SignUp
    }, {
        path: "/sign-in",
        Component: SignIn
    }

]);
export default router