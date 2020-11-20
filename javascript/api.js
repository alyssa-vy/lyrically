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
                console.log('Get Album Art: Response Fulfilled', data.message.body.album_coverart_100x100)
                resolve(data.message.body.album_coverart_100x100)
            })
            .catch(error =>
            {
                console.log('Get Album Art:', error)
            })
    })
}