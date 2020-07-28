const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // io.emit('welcome', 'Welecome!')
    // socket.broadcast.emit('welcome', 'A new user has joined')
   
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('profinity is not allowed')
        }

        io.emit('message', message)
        callback(' successfully')
    })

    socket.on('send-location', (postion)=>{
        //io.emit('message', ({location: postion.latitude + ',' +postion.longitude}))
        io.emit('message', ('https://google.com/mapgs?q='+postion.latitude + ',' +postion.longitude))
        
    })

   

    socket.on('disconnect', ()=>{
        io.emit('welcome', 'A user has left the chat')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})