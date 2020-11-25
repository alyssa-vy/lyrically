//Takes a lyric from the user and retrieves data of song related to that lyric
function performSearch(lyric){
    // window.location.href = "../html/results.html";
    songResults = convertResults(lyric);
    songResults.then( (result) => {
        console.log(result);
        sessionStorage.setItem("searchResults", JSON.stringify(result));
    })
    .then( () => {
        let searchResults = JSON.parse(sessionStorage.getItem("searchResults"));
        console.log(searchResults);
    })
    .then( () =>{
        // Load up the results window after saving datat to sessionStorage
        // When results load, cards will be generated in generate-results.js
        window.location.href = "../html/results.html";
    })
    .catch(error => {
        console.log('Request Failed', error);
    })
}


//Takes a lyric from the user and retrieves data of song related to that lyric
function convertResults(lyric) {
    let songResults = [];

    // Take the api's response for a search and extract the data needed
    return new Promise((resolve, reject) => {

        const apiResults = getSong(lyric);
        apiResults.then(data =>{

            // Put required data into a song object
            for (result of data){
                // let artResults = getArt(result.track.album_id);
                // artResults.then(art => {
                //     console.log(art);
                // })
                let song = {
                    artist: result.track.artist_name,
                    title: result.track.track_name,
                    album: result.track.album_name,
                    id: result.track.track_id,
                    artwork: "http://placekitten.com/200/200" //temp holder
                    // artwork: getArt(result.track.albumid)
                };
                // add the song to the results
                songResults.push(song);
            }
            resolve(songResults);
        })
    })
}
