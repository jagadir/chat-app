const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/user')


app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
   
    socket.on('join', (options, callback)=>{

      const {error, user} =  addUser({id: socket.id, ...options})
      if(error){
          return callback(error)
      }
      
      socket.join(user.room)
      socket.emit('message', generateMessage('Welcome!'))
      socket.broadcast.to(user.room).emit('message', generateMessage(user.username + ' has joined!'))
      callback()

    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('profinity is not allowed')
        }

        io.emit('message', generateMessage(message))
        callback(' successfully')
    })

    socket.on('send-location', (position, callback)=>{
        io.emit('location', generateLocationMessage('https://google.com/maps?q='+position.latitude + ',' +position.longitude))
        callback()
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', generateMessage(user.username + ' has left'))
        }

        //io.emit('quit', generateMessage('A user has left the chat'))
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})