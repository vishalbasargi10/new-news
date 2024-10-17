import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import styled, { keyframes } from 'styled-components';

// Animation for the message appearance
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); /* Adjust height to fit within the viewport */
  max-width: 400px; /* Decreased width */
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.div`
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  text-align: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* WebKit-based browsers (Chrome, Safari) */
  }
`;

const Message = styled.div`
  max-width: 60%;
  align-self: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.isOwnMessage ? '#dcf8c6' : 'white')};
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease; /* Add fade-in animation */

  /* Prevent overflow and allow text wrapping */
  word-wrap: break-word; /* Break long words onto the next line */
  overflow-wrap: break-word; /* Allow the browser to break long words */
  white-space: normal; /* Allow text to wrap normally */

  /* Align text to the left */
  text-align: left; /* Ensure text is aligned to the left */
`;



const Username = styled.div`
  font-weight: bold;
  font-size: 0.9em; /* Slightly smaller font for username */
  margin-bottom: 5px; /* Space between username and message */
`;

const UserMessage = styled.div`
  font-size: 1.1em; /* Larger font for message */
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #357ab8;
  }
`;

function ChatNow() {
  const [username, setUsername] = useState(localStorage.getItem('loggedInUser') || 'Anonymous');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null); // To scroll to the last message

  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8080', {
    onOpen: () => console.log('Connected to WebSocket'),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const parsedMessage = JSON.parse(lastMessage.data);

      if (parsedMessage.type === 'previousMessages') {
        setMessages(parsedMessage.data);
      }

      if (parsedMessage.type === 'newMessage') {
        setMessages((prev) => [...prev, parsedMessage.data]);
      }
    }
  }, [lastMessage]);

  // Scroll to the last message whenever messages update
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (username && message) {
      const messageObject = {
        username,
        message,
      };

      sendMessage(JSON.stringify(messageObject));
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <h1>Let's Debate</h1>
      </ChatHeader>

      <ChatBody>
        {messages.map((msg, index) => {
          const isOwnMessage = msg.username === username;
          return (
            <Message key={index} isOwnMessage={isOwnMessage}>
              <Username>{msg.username}</Username>
              <UserMessage>{msg.message}</UserMessage>
            </Message>
          );
        })}
        {/* Empty div used for scrolling to the last message */}
        <div ref={messageEndRef} />
      </ChatBody>

      <ChatInput>
        <MessageInput
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </ChatInput>
    </ChatContainer>
  );
}

export default ChatNow;
