import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { userContext } from '../context/UserContext';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const signup = async () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date + '.jpg'}`);
      uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log(user);
          await updateProfile(user.user, {
            displayName: name,
            photoURL: url,
          });
          await setDoc(doc(db, 'users', user.user.uid), {
            uid: user.user.uid,
            displayName: name,
            email: email,
            photoURL: url,
          });
          await setUser(user.user);
          await navigate('/');
        });
      });
    });
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
      <label>Choose profile picture</label>
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => {
          setImg(e.target.files[0]);
        }}
      />
      <button onClick={signup}>Sign Up</button>
      already have an account ? <Link to={'/login'}>Login here</Link>
    </div>
  );
};

export default Signup;
