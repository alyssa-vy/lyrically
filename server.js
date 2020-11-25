// Import Starter Pack
const app = require('express')()
const server = require('http').createServer(app)
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const { request } = require('http')
const { response } = require('express')
require('dotenv').config()

// Spotify NPM
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
        console.log('token: ', data.body['access_token'])
    },
    function(err)
    {
        console.log('Something went wrong while getting the spotify token', err)
    }
)

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
/*
// Get Spotify Token
app.post('/token', async (request, response) =>
{
    // Setup Token API
    const client_id = process.env.SPOTIFY_ID
    const client_secret = process.env.SPOTIFY_SECRET
    const token_url = 'https://accounts.spotify.com/api/token'
    const token_options = 
    {
        url: token_url,
        headers:
        {         
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-type': 'application/x-www-form-urlencoded' 
        },
        body: 'grant_type=client_credentials'
    }

    // Token Fetch
    const token_response = await fetch(token_url, token_options)
    const token_data = await token_response.json()
    const token = token_data.access_token

    // remove when done
    console.log('token test: ', token)
    response.json(token)
})
*/

app.get('/albums/:album_name', async (request, response) =>
{
    const album_name = request.params.album_name
    console.log(album_name)
    results = {}

    results = await spotifyApi.searchAlbums(album_name, {limit : 5})
    console.log(results.body)
    response.json(results.body)
   

       
})
/*
// Get Album Artwork from Spotify API
app.get('/albums/:album_name', async (request, response) =>
{
    // Album Search Setup
    const album_name = request.params.album_name
    console.log('Server Album Art Variable: ', album_name)
    console.log('album token: ', token)
    const album_url = `https://api.spotify.com/v1/search?q=${album_name}&type=album&limit=10`
    const album_options = 
    {
        method: 'GET',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const album_response = await fetch(album_url, album_options)
    const album_data = await album_response.json()
    console.log('Server album_data: ', album_data)
    const data = album_data
    response.json(data)
})
*/
app.listen(port, hostname, () => 
{
    console.log(`Server running at http://${hostname}:${port}/`)
})