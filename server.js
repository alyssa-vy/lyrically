// Const Starter Pack
const app = require('express')()
const server = require('http').createServer(app)
const express = require('express')
const path = require('path')

const hostname = 'localhost'
const port = 3000

app.use(express.static(path.join(__dirname, '../html/')))

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + 'index.html')
})

server.listen(port, hostname, () => 
{
    console.log(`Server running at http://${hostname}:${port}/`)
})