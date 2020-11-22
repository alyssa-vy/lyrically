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

// Spotify Stuff


// Get's Album Art from Spotify
function getToken()
{
    // Credentials
    const client_id = 'bd1d313f66964b76b79b54c2e747f016'
    const client_secret = '4486dfa8c90d4b85963a9a46e27638fc'
    const redirect_uri = 'http://127.0.0.1:5500/lyrically/html/'
    const heroku = 'https://cors-anywhere.herokuapp.com/'
    const base_url = 'https://accounts.spotify.com/authorize'
    const post_url = 'https://accounts.spotify.com/api/token'
 /*   
    // Implicit Grant Flow
    let url = `${base_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`

    return new Promise((resolve, reject) =>
    {
        fetch(cors+url)
            .then(response =>
            {
                console.log('Token Fetch', response)
                return response.text()
            })
            .then(data =>
            {
                console.log('Token Response Fulfilled:', data)
                resolve(data)
            })
            .catch(error =>
            {
                console.log('Token Error:', error)
            })
    })
*/
    // Client Credentials Flow


    const authOptions =
    {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers:
        {         
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-type': 'application/x-www-form-urlencoded' 
        },
        body: 'grant_type=client_credentials'
    }
    
    let token = new Promise((resolve, reject) =>
    {
        fetch(post_url, authOptions)
        .then(response => 
        { 
            console.log(response) 
            return response.json()
        })
        .then(data =>
        {
            console.log('Spotify Token:', data.access_token)
            resolve(data.access_token)
        })
        .catch(error =>
        {
            console.log('Get Album Art:', error)
        })
    })        

    console.log('token variable', token)


/*
    var 
    let access_token = function() 
    {
 

        const get_token = async () =>
        {
            const result = await fetch(`https://accounts.spotify.com/api/token`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
                },
                body: 'grant_type=client_credentials'
            }) 
            console.log('API Authorization Result', data)
            const data = await result.json()
            return data.access_token
        }
    }

    let album_id = '0sNOF9WDwhWunNAHPD3Baj' //test value
    let url = `https://api.spotify.com/v1/albums/${album_id}`
     
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
            .catch(error =>
            {
                console.log('Get Album Art Error:', error)
            })
    })
    */
}

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