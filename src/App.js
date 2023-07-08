import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpass from "./pages/ForgotPassword";
import Game from "./pages/Game";
import Library from "./pages/Library";
import CreateTopic from "./pages/CreateTopic";
import Topic from "./pages/Topic";
import Profile from "./pages/Profile";
import AddGame from "./pages/Addgame";
import Forum from "./pages/Forum";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<Forgotpass />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/games/:id" element={<Game />} />
      <Route path="/forums/createtopic" element={<CreateTopic />} />
      <Route path="/topics/:id" element={<Topic />} />
      <Route path="/profilepage" element={<Profile />} />
      <Route path="/games/:id/review" element={<AddGame />} />
      <Route path="/forums/:id" element={<Forum />} />
    </Routes>
  );
}
