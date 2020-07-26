const path = require('path')
const express = require('express')

const port = process.env.PORT|| 3000

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log("web server listening on port ${port}")
})
