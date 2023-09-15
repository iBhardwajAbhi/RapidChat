import React, { useContext, useEffect, useRef, useState } from 'react';
import { chatContext } from '../context/ChatContext';
import { userContext } from '../context/UserContext';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';

import '../style/home-page.css';

const Chats = () => {
  const [message, setMessage] = useState('');
  const [convo, setConvo] = useState(null);
  const { chatUser } = useContext(chatContext);
  const { user } = useContext(userContext);

  const sentStyle = {
    display: 'flex',
    'flex-direction': 'row-reverse',
    'font-size': '18px',
    'align-items': 'center',
    padding: '5px 10px',
  };

  const recievedStyle = {
    display: 'flex',
    'font-size': '18px',
    padding: '5px 10px',
  };
  const imageStyle = {
    'align-self': 'center',
    height: '30px',
    width: '30px',
    'border-radius': '30px',
  };
  const fetchConvo = async () => {
    const uid =
      chatUser.uid > user.uid
        ? chatUser.uid + user.uid
        : user.uid + chatUser.uid;
    await onSnapshot(doc(db, 'chats', uid), (doc) => {
      const res = doc.data();
      if (res) setConvo(res.messages);
    });
  };

  const sendMessage = async () => {
    const uid =
      chatUser.uid > user.uid
        ? chatUser.uid + user.uid
        : user.uid + chatUser.uid;
    const msg = {
      id: uuid(),
      text: message,
      sentBy: user.uid,
      sentTo: chatUser.uid,
      createdAt: new Date(),
    };
    if (message && message != '')
      await updateDoc(doc(db, 'chats', uid), { messages: arrayUnion(msg) });
    await setMessage('');
  };

  const startChat = async (uid) => {
    const res = await getDoc(doc(db, 'chats', uid));
    if (!res.exists()) await setDoc(doc(db, 'chats', uid), { messages: [{}] });
  };

  useEffect(() => {
    if (user && chatUser) {
      if (
        chatUser.uid == user.uid ||
        chatUser.uid == undefined ||
        user.uid == undefined
      )
        return;
      const uid =
        chatUser.uid > user.uid
          ? chatUser.uid + user.uid
          : user.uid + chatUser.uid;
      startChat(uid);
      fetchConvo();
    }
  }, [chatUser]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [convo]);
  return (
    <div id="chat-window">
      {chatUser && (
        <>
          <div id="chat-title">Chatting with {chatUser.displayName} !</div>
          <div className="messages">
            {convo &&
              convo.map((msg) => {
                return (
                  <div
                    key={msg.id}
                    style={
                      msg.sentBy == chatUser.uid ? recievedStyle : sentStyle
                    }
                  >
                    {msg.sentBy == chatUser.uid ? (
                      <img style={imageStyle} src={chatUser.photoURL} alt="" />
                    ) : (
                      <></>
                    )}
                    <div
                      style={{
                        margin: '5px 10px',
                        border: '1px solid black',
                        padding: '5px',
                        'border-radius': '5px',
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>

          <div id="message-input">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
              value={message}
            />
            <button onClick={sendMessage}>Send Message</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chats;
