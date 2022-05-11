import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Movies from "./components/movies/Movies";
import Network from "./components/network/Network";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/notFound/NotFound";
import People from "./components/people/People";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Details from "./components/details/Details";
import Tv from "./components/tv/Tv";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);

  const getUserData = () => {
    let tokenDecoded = jwtDecode(localStorage.getItem("userToken"));
    setUserData(tokenDecoded);
  };

  const logOut = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  };

  const location = useLocation();
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" state={{path:location.pathname}} />;
    } else {
      return children;
    }
  };

  return (
    <>
      <Navbar userData={userData} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="home" element={<Home />} />

          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<Tv />} />

          <Route path="details">
            <Route
              path=":type/:id"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="people" element={<People />} />
          <Route path="login" element={<Login getUserData={getUserData} />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
