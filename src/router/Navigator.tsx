import { Routes, Route } from "react-router";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Home from "../page/Home";
import LandingPage from "../page/Landing_Page";
import Dashboard from "../page/Dashboard";
import Users from "../page/Users";
import Document from "../page/Document";
import Tasks from "../page/Tasks";
import Profile from "../page/Profile";
import ProtectedRoute from "./ProtectedRoute";

function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="document" element={<Document />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Navigator;
