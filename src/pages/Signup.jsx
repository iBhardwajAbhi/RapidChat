import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { userContext } from "../context/UserContext";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const signup = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: name,
      email: email,
      photoURL: `https://ui-avatars.com/api/?name=${name}&length=2`,
    });
    await updateProfile(user, {
      displayName: name,
      photoURL: `https://ui-avatars.com/api/?name=${name}&length=2`,
    });
    const signInUser = await signInWithEmailAndPassword(auth, email, password);
    setUser(signInUser.user);
    localStorage.setItem("user", JSON.stringify(signInUser.user));
    navigate("/");
  };

  return (
    <div id="card">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeholder="email"
        type="email"
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
      <button onClick={signup}>Sign Up</button>
      already have an account ? <Link to={"/login"}>Login here</Link>
    </div>
  );
};

export default Signup;
