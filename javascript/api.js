// fetching api data

// had to prefix with https://cors-anywhere.herokuapp.com to get past CORS error
var api_key = '1227c8dc748dfe0b1fb9cda395e207ce	';
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
            // .then(data => {
            //     console.log('Data', data);
            //     var searchTrack = data.message.body.track_list[2].track.track_id;
            //     // find a specific track and print the lyrics
            //     let url2 = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+searchTrack+'&apikey='+api_key;
            //     fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url2)}`)
            //         .then(response => {
            //             console.log('Response Success!', response);
            //             return response.json();
            //         })
            //         .then(data => {
            //             console.log('Lyrics', data.message.body.lyrics.lyrics_body); // print lyrics!!
            //         })
            //         .catch(error => {
            //             console.log('Request Failed', error);
            //         })
            // })
            .catch(error => {
                console.log('Request Failed', error);
            })
    })
}

// Get song lyrcics based on song id
function getLyrics(song_id)
{
    let url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='${song_id}&apikey=${api_key}`

    return new Promise((resolve, reject) =>
    {
        fetch(cors+encodeURIComponent(url))
            .then(response => 
            {
                console.log('Get Lyrics: Response Sucess', reponse)
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
    let url = `http://api.musixmatch.com/ws/1.1/album.get?album_id='${album_id}&apikey=${api_key}`

    new Promise((resolve, reject) =>
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