
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Register';
import Forgotpass from './pages/ForgotPassword';


export default function App() {
  return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/forgotpassword" element={<Forgotpass/>} />
          <Route path="/homepage" element={<Homepage/>} />
        </Routes>
  );
}