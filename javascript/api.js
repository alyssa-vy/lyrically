// fetching api data

// had to prefix with https://cors-anywhere.herokuapp.com to get past CORS error
//var api_key = '1227c8dc748dfe0b1fb9cda395e207ce	';
// Mike's Key
var api_key = '6bc9f28bbd80025649863c8396ddde40'
//var keyword = 'apple';
//let url = 'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_lyrics='+keyword+'&apikey='+api_key;
const cors = `https://api.allorigins.win/raw?url=`

// Returns an Array of 10 Songs
function getSong(input)
{
    return new Promise((resolve, reject) =>
    {
        // Get user input
        let url = `http://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${input}&f_has_lyrics&apikey=${api_key}`

        // find tracks that contain the lyric ___
        fetch(cors+encodeURIComponent(url)) 
            .then(response => {
                console.log('Get Song: Response Success!', response);
                return response.json();
            })
            .then(data =>
                {
                    console.log('Get Song: Response Fulfilled', data.message.body.track_list)
                    resolve(data.message.body.track_list)
                })
            .catch(error => {
                console.log('Request Failed', error);
            })
    })
}

// Get song lyrics based on song id
function getLyrics(song_id)
{
    return new Promise((resolve, reject) =>
    {
        let url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${song_id}&apikey=${api_key}`

        fetch(cors+encodeURIComponent(url))
            .then(response => 
            {
                console.log('Get Lyrics: Response Sucess', response)
                return response.json() 
            })
            .then(data => 
            {
                console.log('Get Lyrics: Response Fulfilled', data.message.body.lyrics.lyrics_body)
                resolve(data.message.body.lyrics.lyrics_body)
            })
            .catch(error => 
            {
                console.log('Get Lyrics: Request Failed', error)
            })
    })
}

// Get Albums Art
function getArt(album_id)
{
    let url = `http://api.musixmatch.com/ws/1.1/album.get?album_id=${album_id}&apikey=${api_key}`

    return new Promise((resolve, reject) =>
    {
        fetch(cors+encodeURIComponent(url))
            .then(response =>
            {
                console.log('Get Album Art: Reponse Sucess', response)
                return response.json()
            })
            .then(data =>
            {
                console.log('Get Album Art: Response Fulfilled', data.message.body.album.album_coverart_500x500)
                resolve(data.message.body.album.album_coverart_500x500)
            })
            .catch(error =>
            {
                console.log('Get Album Art:', error)
            })
    })
}

/****** Spotify Api Functions *****/

// Request an API Token
function getToken()
{
    // Credentials
    const client_id = 'bd1d313f66964b76b79b54c2e747f016'
    const client_secret = '4486dfa8c90d4b85963a9a46e27638fc'
    const post_url = 'https://accounts.spotify.com/api/token'
 
    // Client Credentials Flow as Specified in https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
    const options =
    {
        method: 'POST',
        url: post_url,
        headers:
        {         
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-type': 'application/x-www-form-urlencoded' 
        },
        body: 'grant_type=client_credentials'
    }
    
    return new Promise((resolve, reject) =>
    {
        fetch(post_url, options)
        .then(response => 
        { 
            console.log('getToken() Sucess Response:', response) 
            return response.json()
        })
        .then(data =>
        {
            console.log('getToken() Fulfilled Response:', data.access_token)
            resolve(data.access_token)
        })
        .catch(error => console.log('getToken() Error:', error))
    })        
}

// Get Album Art
function getSpotifyAlbumArt(albumId)
{
    // I put a test value for albumId - remove when ready
    albumId = '0sNOF9WDwhWunNAHPD3Baj' 
    let url = `https://api.spotify.com/v1/albums/${albumId}`
    // I brute forced the access token, but it is temporary. 
    // It may last up to an hour
    // Remove once the Authentication Function is done
    //let access_token = 'BQDwfuhSRIryoU73mqvEkiatbp1w3c4qWn4duqK58H8blQ_BeAkPwUWttqlDwyDs10ZY0ycErJbrxe3-emlJPasmAWpFxUYMr2QH2p_6x4QPm13D77wByM6F3dGC2HurVDmY5V_pMyZQNwNRTmJ01LiAVLiBdQIbf7sg_20'
    let access_token = getToken()

    return new Promise((resolve, reject) =>
    {
        fetch(url,
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        })
            .then(response =>
            {
                console.log('Get Album Art: Reponse Sucess', response)
                return response.json()
            })
            .then(data =>
            {
                console.log(data.images[0].url)
                return data.images[0].url
            })
            .catch(error =>
            {
                console.log('Get Album Art Error:', error)
            })
    })
}