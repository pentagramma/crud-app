import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignupPage";
import LoginAuth from "./utils/LoginAuth";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { base_url } from "./utils/base_url";
import { Navigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import Footer from "./components/Footer";

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
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
