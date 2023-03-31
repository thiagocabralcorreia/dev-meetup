import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import MyRegistrations from "./pages/MyRegistrations";

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/registrations" element={<MyRegistrations />} />
      </Routes>
    </Router>
  );
}
