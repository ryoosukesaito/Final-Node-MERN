require('dotenv').config();
const express = require('express');
const app = express();

const rooms =  ['general', 'tech', 'finance', 'crypt'];
const cors = require('cors');
const { error } = require('console');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

require('./utils/mongodb')

const server = require('http').createServer(app);
const PORT = process.env.PORT
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET','POST']
  }
})

app.use('/check', (_, res) => res.json({ response: "Health Check"}).status(200))
app.use('/api', require('./routes/userRoutes'))



app.use((req,res,next) =>{
  const  err = new Error('Route not found');
  err.status = 404;
  next(err);
})
app.use((error, req,res,next)=>{
  res.status(error.status || 500).json({error: error.message})
})



server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})


