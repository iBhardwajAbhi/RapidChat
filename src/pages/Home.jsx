import React, { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AllUsers from "../components/AllUsers";
import Chats from "../components/Chats";
import "../style/home-page.css";

const Home = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  return (
    <>
      {user ? (
        <div>
          <div id="profile-card">
            <h1>Hi {user.displayName} ! </h1>
            <img src={user.photoURL} width="250px" alt="" />
            <button
              onClick={() => {
                setUser(null);
                navigate("/login");
              }}
            >
              Log out
            </button>
          </div>
          <div className="partition">
            <AllUsers />
            <Chats />
          </div>
        </div>
      ) : (
        <>
          <div>loggin out</div>
        </>
      )}
    </>
  );
};

export default Home;
