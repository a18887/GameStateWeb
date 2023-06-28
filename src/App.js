import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpass from "./pages/ForgotPassword";
import Game from "./pages/Game";
import Library from "./pages/Library";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<Forgotpass />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/gamepage" element={<Game />} />
    </Routes>
  );
}
