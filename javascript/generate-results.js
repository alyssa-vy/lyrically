let results = [];
let result1 = {artist: "Artist1", title: "Title1", album: "Album1", artwork: "http://placekitten.com/200/200"}
let result2 = {artist: "Artist2", title: "Title2", album: "Album2", artwork: "http://placekitten.com/200/200"}
let result3 = {artist: "Artist3", title: "Title3", album: "Album3", artwork: "http://placekitten.com/200/200"}
let result4 = {artist: "Artist4", title: "Title4", album: "Album4", artwork: "http://placekitten.com/200/200"}
let result5 = {artist: "Artist5", title: "Title5", album: "Album5", artwork: "http://placekitten.com/200/200"}
let result6 = {artist: "Artist6", title: "Title6", album: "Album6", artwork: "http://placekitten.com/200/200"}
let result7 = {artist: "Artist7", title: "Title7", album: "Album7", artwork: "http://placekitten.com/200/200"}
let result8 = {artist: "Artist8", title: "Title8", album: "Album8", artwork: "http://placekitten.com/200/200"}
let result9 = {artist: "Artist9", title: "Title9", album: "Album9", artwork: "http://placekitten.com/200/200"}
let result10 = {artist: "Artist10", title: "Title10", album: "Album10", artwork: "http://placekitten.com/200/200"}
results.push(result1); 
results.push(result2); 
results.push(result3);
results.push(result4); 
results.push(result5); 
results.push(result6); 
results.push(result7); 
results.push(result8); 
results.push(result9); 
results.push(result10); 

let container = document.getElementById("results-container");

function createCard(song){
    let card = document.createElement("div");
    card.className += "song-card";

    let cardArtist = document.createElement("div");
    let cardTitle = document.createElement("div");
    let cardAlbum = document.createElement("div");
    let cardArtwork = document.createElement("img");

    let artistInfo = document.createTextNode(`Artist: ${song.artist}`);
    let titleInfo = document.createTextNode(`Song: ${song.title}`);
    let albumInfo = document.createTextNode(`Album: ${song.album}`);
    cardArtwork.src = song.artwork;

    cardArtist.className += "card-artist";
    cardTitle.className += "card-title";
    cardAlbum.className += "card-album";
    cardArtwork.className += "card-artwork";

    cardArtist.appendChild(artistInfo);
    cardTitle.appendChild(titleInfo);
    cardAlbum.appendChild(albumInfo);

    card.appendChild(cardArtwork);
    card.appendChild(cardTitle);
    card.appendChild(cardArtist);
    card.appendChild(cardAlbum);
    return card;
}

for (song of results) {
    let songCard = createCard(song);
    container.appendChild(songCard);
}
