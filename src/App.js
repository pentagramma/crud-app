import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignupPage";
import LoginAuth from "./utils/LoginAuth";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { base_url } from "./utils/base_url";
import { Navigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import EachQuestionPage from "./Pages/EachQuestionPage";

axios.interceptors.request.use(
  async (request) => {
    if (!Cookies.get("token")) {
      return request;
    }
    request.headers["token"] = Cookies.get("token");
    request.headers["refresh-token"] = Cookies.get("refresh-token");
    const { exp } = jwt_decode(Cookies.get("token"));
    const expDate = new Date(parseInt(exp) * 1000);
    const currentDate = new Date();
    if (currentDate > expDate && Cookies.get("status") == "Y") {
      Cookies.set("status", "N");
      try {
        await axios.get(`${base_url}/api/v1/user/refresh`).then((response) => {
          Cookies.set("token", response.data.token);
          Cookies.set("status", "Y");
        });
        request.headers["token"] = Cookies.get("token");
        request.headers["refresh-token"] = Cookies.get("refresh-token");
      } catch (err) {
        console.log("refreshtoken error", err);
        Cookies.remove("isLoggedIn");
        <Navigate to={"/login"} />;
      }
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/profile"
          element={
            <LoginAuth>
              <Profile />
            </LoginAuth>
          }
        />
        <Route
          exact
          path="/"
          element={
            <LoginAuth>
              <Dashboard />
            </LoginAuth>
          }
        />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/each-question"
          element={
            <LoginAuth>
              <EachQuestionPage />
            </LoginAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
