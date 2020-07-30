const users = []
//add user, remove user, get user, get user in room

const addUser = ({id, username, room})=>{
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate data
    if(!username || !room){
        return {
            error: 'Username and room are required'
        }
    }

    //check for existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate username
    if(existingUser)
    {
        return {error: 'User is in use'}
    }

    //store user
    const user = {id, username, room}
    users.push(user)
    return {user}

}

const removeUser = (id)=>{
    const index = users.findIndex((user)=> user.id === id)
    if(index === -1){
        return undefined
    }

    return users.splice(index, 1)[0]
}



const getUser = (id)=>{
    const user = users.find((user)=> user.id === id)
    if(!user)
    {
        return undefined
    }
    return user
}

const getUsersInRoom = (room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user)=> user.room === room)
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
//testing
// addUser({id:11, username:'raj', room:'romm1'})
// addUser({id:12, username:'raj', room:'room2'})
// addUser({id:13, username:'rajnish', room:'room1'})
// addUser({id:14, username:'rajnish', room:'room1'})
// addUser({id:15, username:'raj', room:'room1'})
// addUser({id:16, username:'raj', room:'room2'})
// addUser({id:17, username:'raj', room:'room2'})

//  console.log(users)

// console.log(removeUser(11))
//console.log(users)

//console.log(getUser(11))

//console.log(getUsersInRoom('room3'))