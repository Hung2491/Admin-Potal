import { Routes, Route,  } from "react-router";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Home from "../page/Home";
import LandingPage from "../page/Landing_Page";

function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/home" element={<Home />} ></Route>
    </Routes>
  );
}

export default Navigator;
