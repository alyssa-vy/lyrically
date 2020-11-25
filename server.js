// Import Starter Pack
const app = require('express')()
const server = require('http').createServer(app)
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config()

// Const Starter Pack
const hostname = 'localhost'
const port = process.env.Port || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) =>
{
    response.sendFile(__dirname + '/public/html/')
})

// Get a list of songs based on lyric search
app.get('/getsong/:lyrics', async (request, response) =>
{
    // Get Song
    const lyrics = request.params.lyrics
    console.log('Server Lyric Variable: ', lyrics)
    
    // Setup API
    const api_key = process.env.MUSIXMATCH_KEY
    const url = `http://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${lyrics}&f_has_lyrics&apikey=${api_key}`
    
    // API Fetch
    const song_response = await fetch(url)
    console.log('Server url fetch: ', url)
    const song_data = await song_response.json()
    const data = song_data
    console.log('Server song_data: ', song_data)
    
    // Return the data
    response.json(data)
})

// Get the lyrics of a song based on the song id
app.get('/getlyrics/:song_id', async (request, response) =>
{
    // Get Song ID
    const song_id = request.params.song_id
    console.log('Server Song ID Variable: ', song_id)
    
    // Setup API
    const api_key = process.env.MUSIXMATCH_KEY
    const url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${song_id}&apikey=${api_key}`
    
    // API Fetch
    const lyrics_response = await fetch(url)
    console.log('Server lyrics_url fetch: ', url)
    const lyrics_data = await lyrics_response.json()
    
    const data = lyrics_data
    console.log('Server lyrics_data: ', lyrics_data)
    response.json(data)
})

app.listen(port, hostname, () => 
{
    console.log(`Server running at http://${hostname}:${port}/`)
})
