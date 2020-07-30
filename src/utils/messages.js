const { now } = require("moment")

const generateMessage = (username, text) => {
    return {
        username: username,
        message: text,
        time: new Date().getTime()
    }
}

const generateLocationMessage = (username, url) =>{
    return {
        username: username,
        url: url,
        time: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}