import { createBrowserRouter } from "react-router";
import Root from "./Root/Root";
import TaskForm from "./Pages/Home/TaskForm";
import AllActivities from "./Pages/AllActivities";
import Profile from "./Pages/Profile";
import TodayTask from "./Pages/TodayTask";
const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
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

    }

]);
export default router