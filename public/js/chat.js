const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

//templages 
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML
const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true})
socket.on('message', (message) => {
    const html = Mustache.render($messageTemplate, {
        username: message.username,
        text: message.message,
        createAt: moment(message.createdAt).format('hh:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})


socket.on('roomData', ({room, users})=>{
    const html = Mustache.render($sidebarTemplate, {
        room: room,
        users: users
    })
    $sidebar.innerHTML=html
})
socket.on('location', (locationMsg) => {
    const html = Mustache.render($locationTemplate, {
        //url
        username: locationMsg.username,
        url: locationMsg.url,
        createAt: moment(message.time).format('hh:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //disable
    $messageFormButton.setAttribute('disabled', 'disabled')
    var msg = e.target.elements.message.value
    socket.emit('sendMessage', msg, (error) => {
        //enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
      //  console.log('the message was delivered')
    })

})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('geo location not supported by your browser')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('send-location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('location shared!')
        })
    })

})

socket.emit('join', {username, room},(error)=>{
    if(error){
        alert(error)
        location.href='/' 
    }
})


