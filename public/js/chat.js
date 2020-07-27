const socket = io()

socket.on('welcome', (message) => {
    console.log(message)
})
socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault()
   // var msg = document.querySelector('input').value
   var msg = e.target.elements.message.value 
   socket.emit('sendMessage', msg)
})