// fetching api data

// had to prefix with https://cors-anywhere.herokuapp.com to get past CORS error
var api_key = '1227c8dc748dfe0b1fb9cda395e207ce	';
var keyword = 'apple';
let url = 'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_lyrics='+keyword+'&apikey='+api_key;

// find tracks that contain the lyric ___
fetch(url) 
    .then(response => {
        console.log('Response Success!', response);
        return response.json();
    })
    .then(data => {
        console.log('Data', data);
        var searchTrack = data.message.body.track_list[2].track.track_id;
        // find a specific track and print the lyrics
        let url2 = 'https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+searchTrack+'&apikey='+api_key;
        fetch(url2)
            .then(response => {
                console.log('Response Success!', response);
                return response.json();
            })
            .then(data => {
                console.log('Lyrics', data.message.body.lyrics.lyrics_body); // print lyrics!!
            })
            .catch(error => {
                console.log('Request Failed', error);
            })

    })
    .catch(error => {
        console.log('Request Failed', error);
    })


