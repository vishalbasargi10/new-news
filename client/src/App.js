import './App.css';
import Navbar from './components/Navbar.jsx';
import News from './components/News.jsx';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes // Import Routes directly
} from "react-router-dom";
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import 'react-toastify/dist/ReactToastify.css';
import Saved from './components/Saved.jsx';
import ChatNow from './components/ChatNow.jsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Hide scrollbar for all elements */
  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
  }

  *::-webkit-scrollbar {
    display: none;  /* WebKit-based browsers (Chrome, Safari) */
  }
`;

function App() {
  return (
    <div className="App">
      {/* Apply global styles */}
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/general" element={<News key="general" category="general" saved={0} />} />
          <Route exact path="/" element={<News key="business" category="business" saved={0} />} />
          <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment" saved={0} />} />
          <Route exact path="/health" element={<News key="health" category="health" saved={0} />} />
          <Route exact path="/science" element={<News key="science" category="science" saved={0} />} />
          <Route exact path="/sports" element={<News key="sports" category="sports" saved={0} />} />
          <Route exact path="/chatnow" element={<ChatNow />} />
          <Route exact path="/signup" element={<Signup saved={0} />} />
          <Route exact path="/login" element={<Login saved={0} />} />
          <Route exact path="/saved" element={<Saved saved={0} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
