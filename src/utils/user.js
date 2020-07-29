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
        console.log(username + ' User is in use')
        return {error: 'User is in use'}
    }

    //store user
    const user = {id, username, room}
    users.push(user)
    return {users}
}


// addUser({id:11, username:'raj', room:'romm1'})
// addUser({id:12, username:'raj', room:'room2'})
// addUser({id:12, username:'rajnish', room:'room1'})
// addUser({id:12, username:'rajnish', room:'room1'})
// addUser({id:12, username:'raj', room:'room1'})
// addUser({id:12, username:'raj', room:'room2'})
// addUser({id:12, username:'raj', room:'room2'})

// console.log(users)
