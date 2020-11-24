// Import Starter Pack
const app = require('express')()
const server = require('http').createServer(app)
const express = require('express')
const path = require('path')
// Const Starter Pack
const hostname = 'localhost'
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/public/html/index.html')
})

server.listen(port, hostname, () => 
{
    console.log(`Server running at http://${hostname}:${port}/`)
})