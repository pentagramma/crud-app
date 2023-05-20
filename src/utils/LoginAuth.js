import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "./base_url";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../redux/Login/loginActions";
import React, { useEffect, useState } from "react";


const LoginAuth = ({ children }) => {
  const isLoggedIn = Cookies.get("isLoggedIn")
  return (
    <>
    {isLoggedIn?children:<Navigate to={'/login'}/>}
    </>
  )
};

export default LoginAuth;
