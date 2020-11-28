// Import Starter Pack
const app = require('express')()
const server = require('http').createServer(app)
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const { request } = require('http')
const { response } = require('express')
require('dotenv').config()
// Const Starter Pack
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

// ********* Spotify NPM *********
const SpotifyWebApi = require('spotify-web-api-node')
// API Credentials
const spotifyApi = new SpotifyWebApi(
    {
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET
    }
)
// Get Spotify Token
spotifyApi.clientCredentialsGrant().then(
    function(data)
    {
        spotifyApi.setAccessToken(data.body['access_token'])
    },
    function(err)
    {
        console.log('Something went wrong while getting the spotify token', err)
    }
)
// ********* End Spotify NPM *********

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) =>
{
    response.sendFile(__dirname + '/public/html/')
})

// Get a list of songs from MusixMatch based on lyric search
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
    const song_data = await song_response.json()
    const data = song_data
    console.log('Server song_data: ', song_data)
    
    // Return the data
    response.json(data)
})

// Get the lyrics of a song from MusixMatch based on the song id
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

// Get Album from Spotify based on its name
app.get('/albums/:album_name', async (request, response) =>
{
    // Get the Album Name
    const album_name = request.params.album_name
    console.log(album_name)
    let results = {}

    results = await spotifyApi.searchAlbums(album_name, {limit : 5})
    console.log(results.body)
    response.json(results.body)      
})

app.listen(port, hostname, () => 
{
    console.log(`Server running at http://${hostname}:${port}/`)
})