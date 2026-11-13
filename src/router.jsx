import { createBrowserRouter } from "react-router";
import Home from "./Components/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    }
   
]);
export default router