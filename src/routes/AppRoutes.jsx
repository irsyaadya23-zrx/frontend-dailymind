import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MoodTrack from "../pages/MoodTrack";
import Pomodoro from "../pages/Pomodoro";
import ToDoList from "../pages/ToDoList";
import Journal from "../pages/Journal";
import Feedback from "../pages/Feedback";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import ProtectedRoute from "../routes/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import LandingPage from "../pages/LandingPage";

export default function AppRoutes() {
  return (
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<LandingPage />} />

        {/* PUBLIC */}
        <Route element={<AuthLayout />} >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test" element={<h1>TEST ROUTE</h1>} />
        </Route>

        {/*  PRIVATE */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<MainLayout />} >
            <Route path="/home" element={<Home />} />
            <Route path="/moodtrack" element={<MoodTrack />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/Admin" element={<Admin />} />
        </Route>
        {/* </Route> */}

      </Routes>
  );
}