import React, { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AllUsers from "../components/AllUsers";
import Chats from "../components/Chats";
import { chatContext } from "../context/ChatContext";

const Home = () => {
  const { user, setUser } = useContext(userContext);
  const { chatUser, setChatUser } = useContext(chatContext);
  const navigate = useNavigate();

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user"));
    console.log(res);
    if (res) {
      setUser(res);
      setChatUser(null);
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  return (
    <>
      {user ? (
        <div id="home-container">
          {chatUser == null && (
            <div id="profile-card">
              <h1 id="logo">ChatApp</h1>
              <img
                src={user.photoURL}
                width="250px"
                alt="Profile"
                className=""
              />
              <button
                onClick={() => {
                  setUser(null);
                  setChatUser(null);
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Log out
              </button>
            </div>
          )}

          <div className="">{chatUser ? <Chats /> : <AllUsers />}</div>
        </div>
      ) : (
        <div className="">Logging out...</div>
      )}
    </>
  );
};

export default Home;
