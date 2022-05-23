import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/SignIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
