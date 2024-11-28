import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import TaskList from "../modules/task/list";
import SignIn from "../modules/sign-in";
import SignUp from "../modules/sign-up";
import PrivateRoute from "./private-route";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<PrivateRoute Component={TaskList} />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>,
  ),
);

export default router;
