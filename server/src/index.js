require('dotenv').config();
const express = require('express');
const app = express();

const rooms =  ['general', 'tech', 'finance', 'crypt'];
const cors = require('cors');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const PORT = process.env.PORT
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET','POST']
  }
})

app.get('/api', (_, res) => res.json({ response: "Health Check"}).status(200))

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})


