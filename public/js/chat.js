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
   socket.emit('sendMessage', msg, (ackMessage)=>{
       console.log('the message was delivered' + ackMessage)
   })

})

document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        alert('geo location not supported by your browser')
        
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('send-location', {
            latitude: position.coords.longitude,
            longitude: position.coords.longitude
        })
        
        
    })
})