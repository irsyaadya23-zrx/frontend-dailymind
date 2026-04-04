import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MoodTrack from "../pages/MoodTrack";
import Pomodoro from "../pages/Pomodoro";
import ToDoList from "../pages/ToDoList";
import Journal from "../pages/Journal";
import Feedback from "../pages/Feedback";
import Register from "../pages/Register";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/moodtrack" element={<MoodTrack />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}