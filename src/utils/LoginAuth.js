import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const LoginAuth = ({children}) => {
    console.log('coming to auth')
  if(Cookies.get('token')){
    return children
  }
  return <Navigate to={'/login'}  />
}

export default LoginAuth
