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
import { useNavigate } from "react-router-dom";

axios.interceptors.request.use(
  async (request) => {
    if (!Cookies.get("token")) {
      return request;
    }
    const navigate = useNavigate()
    request.headers["token"] = Cookies.get("token");
    request.headers["refresh-token"] = Cookies.get("refresh-token");
    const { exp } = jwt_decode(Cookies.get("token"));
    const expDate = new Date(parseInt(exp) * 1000);
    const currentDate = new Date();
    console.log(currentDate, expDate);
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
        navigate('/login',{replace:true})
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
    </>
  );
}

export default App;
