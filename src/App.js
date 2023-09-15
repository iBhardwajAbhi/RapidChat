import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { userContext } from './context/UserContext';
import { chatContext } from './context/ChatContext';

function App() {
  const [user, setUser] = useState(null);
  const [chatUser, setChatUser] = useState({});
  return (
    <div className="App">
      <userContext.Provider value={{ user, setUser }}>
        <chatContext.Provider value={{ chatUser, setChatUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </chatContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
