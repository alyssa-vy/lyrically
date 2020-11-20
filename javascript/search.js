//Takes a lyric from the user and retrieves data of song related to that lyric

function performSearch(lyric){
    let songResults = [];
    const apiResults = getSong(lyric);

    // Take the api's response for a search and extract the data needed
    apiResults.then(data =>{
        console.log(data);

        // Put required data into a song object
        for (result of data){
            // let artResults = getArt(result.track.album_id);
            // artResults.then(art => {
            //     console.log(art);
            // })
            let song = {
                artist: result.track.artist_name,
                title: result.track.track_name,
                album: result.track.album_name
                // artwork: getArt(result.track.albumid)
            };
            songResults.push(song);
        }
        console.log(songResults);
    })
}