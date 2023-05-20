import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "./base_url";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/Login/loginActions";
import React, { useEffect, useState } from "react";


const LoginAuth = ({ children }) => {
  console.log('coming to auth')
  const dispatch = useDispatch()
  const [check,setCheck] = useState(true)
  useEffect(()=>{
   checkData()
  },[])
  const checkData = async ()=>{
    await axios
    .get(`${base_url}/api/v1/user/profile`)
    .then((response) => {
      dispatch(loginActions(response.data.user));
    }).then(()=>{
      setCheck(true)
    })
    .catch((err) => {
      console.log(err);
      setCheck(false)
    });
  }
  return (
    <>
    {check?children:<Navigate to={'/login'}/>}
    </>
  )
};

export default LoginAuth;
