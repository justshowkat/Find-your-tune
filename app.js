const getId = id => document.getElementById(id)

const fetchLyrics = (songName, artistName) => {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`).then(res => res.json()).then(data => {
        if (data.lyrics) {
            getId('lyrics-Title').innerHTML = `<h1 class="text-center"> ${songName}</h1>
            <h5 class="text-center">By: ${artistName}</h5>`
            getId('lyrics-bar').innerText = `${data.lyrics}`
        } else {
            getId('lyrics-Title').innerHTML = `
            <h1 class="text-center">We didn't find any lyrics for: ${songName}</h1>
            <h5 class="text-center">By: ${artistName}</h5>`
            getId('lyrics-bar').innerText = `${data.lyrics}`
        }
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
          });
    })
}

const fetchSong = () => { //line : 29 inside an event handler
    let searchInput = getId('search-input').value.trim()
        
        fetch(`https://api.lyrics.ovh/suggest/${searchInput}`).then(res => res.json()).then(data => {
        let songs = data.data.map(items => items)

        songs.forEach(item => {
               getId('search-result').innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${item.title}</h3>
                        <p class="author lead">Album: <span class='badge bg-light text-dark text-wrap'>${item.album.title}</span></p>
                        <p class="author lead">By: <span class='badge bg-success text-wrap'>${item.artist.name}</span></p>
                        <audio controls>
                            <source src=${item.preview} type="audio/ogg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button id='getLyrics' class="btn btn-success" onclick="fetchLyrics('${item.title}', '${item.artist.name}')">Get Lyrics</button>
                    </div>
                </div>`
        }); //forEach ends here
    })//fetch then ends here
}

const searchBtnEvent = () => {
    getId('search-input').setAttribute('disabled', true)
    getId('search-btn').innerText = 'Search Another song?'
    getId('search-btn').addEventListener('click', () => location.reload())
    fetchSong()
}
