// fetching api data

// Returns an Array of 10 Songs
function getSong(input)
{
    // Get user input
    let url = `/getsong/${input}`
   
    return new Promise((resolve, reject) =>
    {
        // find tracks that contain the lyric
        fetch(url)
            .then(response => 
            {
                console.log('Get Song: Response Success!', response)
                return response.json()
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
    let url = `/getlyrics/${song_id}`

    return new Promise((resolve, reject) =>
    {
        fetch(url)
            .then(response => 
            {
                console.log('Get Lyrics: Response Success', response)
                return response.json() 
            })
            .then(data => 
            {
                console.log('Get Lyrics: Response Fulfilled', data.message.body.lyrics.lyrics_body)
                var toReturn = {
                    lyrics: data.message.body.lyrics.lyrics_body,
                    copyright: data.message.body.lyrics.lyrics_copyright,
                }
                resolve(toReturn);
                //resolve(data.message.body.lyrics.lyrics_body)
            })
            .catch(error => 
            {
                console.log('Get Lyrics: Request Failed', error)
            })
    })
}

// Get Artist Info
function getArtist(artist_id)
{
    let url = `/getartist/${artist_id}`

    return new Promise((resolve, reject) =>
    {
        fetch(url)
            .then(response => 
            {
                console.log('Get Artist: Response Success', response)
                return response.json() 
            })
            .then(data => 
            {
                console.log('Get Artist: Response Fulfilled', data.message.body.artist)
                resolve(data.message.body.artist);
            })
            .catch(error => 
            {
                console.log('Get Artist: Request Failed', error)
            })
    })
}

/* It seems that Musixmatch does not support Album Art on the free API
We replaced the getArt() with getSpotifyArt()

// Get Album Art
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
*/


/****** Spotify Api Functions *****/

// Get Album Art From Spotify
function getSpotifyAlbumArt(albumName)
{
    // Get Album Name
    let url = `/albums/${albumName}`
    
    return new Promise((resolve, reject) =>
    {
        fetch(url)
            .then(response => 
            {
                console.log('getSpotifyAlbumArt() Reponse:', response)
                    return response.json()
                })
                .then(data =>
                {
                    /*  Album Cover Art comes in 3 sizes
                        images[0] is 600x600 px
                        images[1] is 300x300 px
                        images[2] is 64x64  px
                    */
                    console.log('getSpotifyAlbumArt() Fulfilled:', data.albums.items)
                    // If can't find album, then return a pre-defined image
                    resolve (data.albums.items[0].images[1])
                 })
                .catch(error =>
                {
                    console.log('getSpotifyAlbumArt() Error:', error)
                })
    })
}