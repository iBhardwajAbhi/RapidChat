import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { userContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user.user));
        setUser(user.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div id="card">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        className="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (email && password) login();
        }}
      >
        Login
      </button>
      Dont have an account ? <Link to={"/signup"}>Sign up</Link>
      {error && <div>incorrect mail or password</div>}
    </div>
  );
};

export default Login;
