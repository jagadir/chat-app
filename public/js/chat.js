const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
    console.log(message)
})


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //disable
    $messageFormButton.setAttribute('disabled', 'disabled')
    var msg = e.target.elements.message.value
    socket.emit('sendMessage', msg, (error) => {
        //enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log('the message was delivered' + ackMessage)
    })

})

sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('geo location not supported by your browser')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('send-location', {
            latitude: position.coords.longitude,
            longitude: position.coords.longitude
        },()=>{
            $sendLocationButton.removeAttribute('disabled')
            console.log('location shared!')
        })
    })

})