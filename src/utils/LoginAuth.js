import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const LoginAuth = ({children}) => {
  if(Cookies.get('token')){
    return children
  }
  return <Navigate to={'/login'}  />
}

export default LoginAuth
