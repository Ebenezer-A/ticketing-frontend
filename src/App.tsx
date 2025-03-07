import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
