const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

require('./models/db');
const AuthRouter = require('./routes/AuthRouter');
const newsRoutes = require('./routes/SaveNews');

// Routes
app.use('/auth', AuthRouter);
app.use('/', newsRoutes);

app.get('/', (req, res) => {
  res.send('pong');
});

// Chat Schema and Model
const chatSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

// Serve the React app (optional)
app.use(express.static('client/build'));

// WebSocket Server Setup
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket Connection Handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Send previous chat messages to the client upon connection
  Chat.find({})
    .then((chats) => {
      ws.send(JSON.stringify({ type: 'previousMessages', data: chats }));
    })
    .catch((err) => console.error('Error fetching previous messages:', err));

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received WebSocket message:', message);

    try {
      const parsedMessage = JSON.parse(message);
      console.log('Parsed message:', parsedMessage);

      // Save the message to MongoDB
      const chatMessage = new Chat({
        username: parsedMessage.username,
        message: parsedMessage.message,
      });

      chatMessage.save()
        .then(() => {
          console.log('Message successfully saved to MongoDB');

          // Broadcast the new message to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'newMessage', data: chatMessage }));
            }
          });
        })
        .catch((err) => {
          console.error('Error saving message to MongoDB:', err);
        });
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
    }
  });

  // Listen for WebSocket connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(8080,'0.0.0.0', () => {
  console.log('Server is running on port 8080');
});
