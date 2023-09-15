import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { chatContext } from '../context/ChatContext';
import { userContext } from '../context/UserContext';

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const { setChatUser } = useContext(chatContext);
  const { user } = useContext(userContext);
  const uid = user.uid;
  const setChat = (displayName, uid, photoURL) => {
    setChatUser({ displayName, uid, photoURL });
  };
  useEffect(() => {
    let arr = [];
    getDocs(collection(db, 'users'))
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          if (element.data().uid != user.uid) arr.push(element.data());
        });
      })
      .then(() => {
        setUsers(arr);
      });
  }, []);
  return (
    <div>
      <h1 style={{ fontSize: 25, textAlign: 'center', marginBottom: '20px' }}>
        All User List
      </h1>
      {users ? (
        users.map((user) => {
          return (
            <div
              id="user-list"
              onClick={() => {
                if (user.uid != uid)
                  setChat(user.displayName, user.uid, user.photoURL);
              }}
              key={user.uid}
            >
              <img src={user.photoURL} width="100px" alt="" />
              <h1>{user.displayName}</h1>
            </div>
          );
        })
      ) : (
        <div>no users</div>
      )}
    </div>
  );
};

export default AllUsers;
