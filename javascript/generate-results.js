// Creates a card based off of song information
function createCard(song){
    let link = document.createElement("a");
    link.setAttribute("href", "javascript:void(0)");
    link.setAttribute("data-micromodal-trigger", "modal-1");
    let card = document.createElement("div");
    card.className += "song-card";
    card.id = song.id;

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
    link.appendChild(card);
    return link;
}


//Takes all results and makes them into cards before adding them to the results container
function addCardsToPage(results) {
    let container = document.getElementById("results-container");
    for (song of results) {
        let songCard = createCard(song);
        container.appendChild(songCard);
    }
}

// If we're on the results page and load the window, create cards
// Makes so this script isn't executed on index.html
if(window.location.href.match("../html/results.html") != null) {
    window.onload = addCardsToPage(JSON.parse(sessionStorage.getItem("searchResults")));
}