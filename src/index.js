 const path = require('path')
const http = require('http')
const express = require('express')

const socketio = require('socket.io')
const port = process.env.PORT|| 3000

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


const server = http.createServer(app)
const io = socketio(server)

io.on('connection', ()=> {
    console.log('New WebSocket connection')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(port, () => {
    console.log('web server listening on port '+ port)
})

