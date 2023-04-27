import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignupPage';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
