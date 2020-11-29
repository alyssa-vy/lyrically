

// Have to create individual Modals for each Song; takes in the the song number
function createModalDivs(modalNum) {
        //<div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
        let slide = document.createElement("div");
        slide.className += "modal micromodal-slide";
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("id", `modal-${modalNum}`);
        console.log(`modal-${modalNum}`);

        //<div class="modal__overlay" tabindex="-1" data-micromodal-close>
        let overlay = document.createElement("div");
        overlay.className += "modal__overlay";
        overlay.setAttribute("tab-index", "-1");
        overlay.setAttribute("data-micromodal-close", "");
        
        //<div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title" aria-describedby="modal-1-content">
        let container = document.createElement("div");
        container.className += "modal__container";
        container.setAttribute("role", "dialog");
        container.setAttribute("aria-modal", "true");
        container.setAttribute("aria-labelledby", `modal-${modalNum}-title`);
        container.setAttribute("aria-describedby", `modal-${modalNum}-content`);
        
        //<div role="document">
        let modalDoc = document.createElement("div");
        container.setAttribute("role", "document");

        // <header class="modal__header">
        let header = document.createElement("header");
        header.className += "modal__header";

        // <h3 class="modal__title" id="modal-1-title">
        let title = document.createElement("h3");
        title.className += "modal__title";
        title.setAttribute("id", `modal-${modalNum}-title`);

        // <button class="modal__close" aria-label="Close modal" aria-controls="modal__container1" data-micromodal-close></button>
        let close = document.createElement("button");
        close.className += "modal__close";
        close.setAttribute("aria-label", "Close modal");
        close.setAttribute("aria-controls", `modal__container${modalNum}`);
        close.setAttribute("data-micromodal-close", "");

        // <main class="modal__content" id="modal-1-content">
        let content = document.createElement("main");
        content.className += "modal__content";
        content.setAttribute("id", `modal-${modalNum}-content`);

        // <footer class="modal__footer">
        let footer = document.createElement("footer");
        footer.className += "modal__footer";

        // <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
        let closeBtn = document.createElement("button");
        closeBtn.className += "modal__btn";
        closeBtn.setAttribute("data-micromodal-close", "");
        closeBtn.setAttribute("aria-label", "Close this dialog window");
        closeBtn.appendChild(document.createTextNode("Close"));
    
        footer.appendChild(closeBtn); // <footer> <button> </button> </footer>

        header.appendChild(title);
        header.appendChild(close);
        //<header> <h3> </h3> <button> </button> </header>

        modalDoc.appendChild(header);
        modalDoc.appendChild(content);
        modalDoc.appendChild(footer);

        container.appendChild(modalDoc);
        overlay.appendChild(container);
        slide.appendChild(overlay);

        // ADD TO RESULTS BODY
        document.body.appendChild(slide);
        MicroModal.show(`modal-${modalNum}`);
        MicroModal.close(`modal-${modalNum}`);

        return;
}

// Set info for Modals based off of the cards they are tied to 
function createModalInfo(title, artist, artistID, album, artwork, songNum, songID) {
    // Create Title of Modal
    let modalTitle = document.getElementById(`modal-${songNum}-title`);
    let modalContainer = document.getElementById(`modal-${songNum}-content`);
    modalTitle.appendChild(document.createTextNode(title));

    // Display Album Art
    let displayArt = document.createElement("div")
    let artImg = document.createElement("img");
    displayArt.appendChild(artImg);
    artImg.src = artwork;
    displayArt.className += "modal__artwork";
    artImg.alt = `${album} Cover`;

    // Create Lyrics Div
    let displayLyrics = document.createElement("div");
    let para = document.createElement("p");
    displayLyrics.appendChild(para);
    displayLyrics.className += "modal__lyrics";

    // Create Copyright Div
    let displayCopy = document.createElement("div");
    let copyPara = document.createElement("p");
    displayCopy.appendChild(copyPara);
    displayCopy.className += "modal__copyright";

    
    let lyricResults = getLyrics(songID);
    lyricResults.then( (result) => {
        console.log(result);
        var lyrics = result.lyrics;
        lyrics = JSON.stringify(lyrics);
        // get rid of \n and add in <br>
        lyrics = lyrics.replace(/\\n/g, "<br />");
        // edit lyric formatting
        lyrics = lyrics.substring(1, lyrics.indexOf("..."));
        para.innerHTML = lyrics;
        // get copyright
        var copyright = result.copyright;
        copyright = JSON.stringify(copyright);
        console.log(copyright);
        copyright = copyright.replace("www.musixmatch.com", "<a href='https://musixmatch.com'>musixmatch</a>");
        // add to paragraph div
        copyPara.innerHTML = copyright;
        
    })

    // Create div for track preview
    let displayPreview = document.createElement("div");
    displayPreview.className += "modal__preview";
    // Find Track in Spotify from Artist & Title
    let track = searchSpotifyTrack(artist, title);
    track.then( (result) => {
        console.log("TEST searchSpotifyTrack: " + result);
        if (result.length != 0) {
            // get the uri or ID from the first result
            var spotifyID = result[0].uri;
            spotifyID = JSON.stringify(spotifyID);
            // chop off irrelevant items
            spotifyID = spotifyID.substring(15, spotifyID.length-1);
            console.log(`Spotify ID = ${spotifyID}`); 
            /*
            let track_preview = getSpotifyTrack(spotifyID);
            track_preview.then( (data) => {
                console.log("Preview URL: " + data);
            })
            */
            // Embed Spotify Preview !
            let iframe = document.createElement("iframe");
            iframe.src = `https://open.spotify.com/embed/track/${spotifyID}`;
            iframe.frameborder = "0";
            iframe.allowTransparency = "true";
            iframe.allow = "encrypted-media";
            displayPreview.appendChild(iframe);
        }
        else {
            displayPreview.innerHTML = "No Preview Available";
        }
    });
    

    let displayAlias = document.createElement("div");
    displayAlias.className += "modal__alias";
    // Get Artist Info from Musixmatch API
    let artistInfo = getArtist(artistID);
    artistInfo.then( (result) => {
        let temp = document.createElement("span");
        temp.innerHTML += "Known Aliases: ";

        // If there are no known aliases, then put N/A in the box
        if (result.artist_alias_list === undefined || result.artist_alias_list.length == 0) {
            var alias = "N/A, ";
            temp.innerHTML += alias;
        }
        // Else, list all the aliases
        else {
            for (alias of result.artist_alias_list) {
                console.log(alias.artist_alias);
                var aliasEdited = JSON.stringify(alias.artist_alias);
                aliasEdited = aliasEdited.substring(1);
                // Connect multiple aliases with a comma
                aliasEdited = aliasEdited.replace('"', ", ");
                temp.innerHTML += aliasEdited;
            }
        }
        // remove last comma
        temp.innerHTML = temp.innerHTML.substring(0, temp.innerHTML.length-2);
        displayAlias.appendChild(temp);
    })

    // Add Title
    let displayTitle = document.createElement("div");
    displayTitle.appendChild(document.createTextNode(`Title: ${title}`));
    // Add Artist
    let displayArtist = document.createElement("div");
    displayArtist.appendChild(document.createTextNode(`Artist: ${artist}`));
    // Add Album
    let displayAlbum = document.createElement("div");
    displayAlbum.appendChild(document.createTextNode(`Album: ${album}`));

    modalContainer.appendChild(displayArt);
    modalContainer.appendChild(displayLyrics);
    modalContainer.appendChild(displayCopy);
    modalContainer.appendChild(displayTitle);
    modalContainer.appendChild(displayArtist);
    modalContainer.appendChild(displayAlias);
    modalContainer.appendChild(displayAlbum);
    modalContainer.appendChild(displayPreview);

}



// Creates a card based off of song information
function createCard(song, songNum){
    let link = document.createElement("a");
    link.setAttribute("href", "javascript:void(0)");
    link.setAttribute("data-micromodal-trigger", `modal-${songNum}`);
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

    cardArtwork.alt = `${song.title} Cover`;

    // Fetch and set the artwork
    let artResults = getSpotifyAlbumArt(song.artist);
    artResults.then( (result) => {
        console.log(result);
        cardArtwork.src = result.url;
        // set Modal Info based off of cards
        createModalInfo(song.title, song.artist, song.artistID, song.album, result.url, songNum, song.id);
    })

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

    link.appendChild(card); // makes cards clickable for modals

    

    return link;
}


//Takes all results and makes them into cards before adding them to the results container
function addCardsToPage(results) {
    let container = document.getElementById("results-container");
    var songNum = 0;
    for (song of results) {
        ++songNum;
        createModalDivs(songNum);
        let songCard = createCard(song, songNum);
        container.appendChild(songCard);
    }
}

// If we're on the results page and load the window, create cards
// Makes so this script isn't executed on index.html
if(window.location.href.match("../html/results.html") != null) {
    window.onload = addCardsToPage(JSON.parse(sessionStorage.getItem("searchResults")));
}