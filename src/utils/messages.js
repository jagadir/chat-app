const { now } = require("moment")

const generateMessage = (text) => {
    return {
        message: text,
        time: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}