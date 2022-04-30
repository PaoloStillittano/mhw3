
function SearchSong(event){
    event.preventDefault();
    const titolo=OAuth.querySelector('#song').value;

    let restURLSpo="https://api.spotify.com/v1/search?type=track&q=" + titolo;

    fetch(restURLSpo,{
            method: 'GET',
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        }
    ).then(onResponseSong).then(onJsonSong);
}

function onResponseSong(response){
    return response.json();
}

function onJsonSong(json){
    const library=document.querySelector("#OAuth-view");
    library.innerHTML='';
    let results=json.tracks.total;

    if(results>4){
        results=4;
    }

    for(let i=0; i<results ; i++){
        const result=json.tracks.items[i];
        const title=result.name;
        const albumName=result.album.name;
        const artist=result.artists[0].name;
        const img_album=result.album.images[0].url;

        const track=document.createElement('div');
        track.classList.add('track');
        const img=document.createElement('img');
        img.src=img_album;
        img.classList.add('track_img');
        const titolo=document.createElement('span');
        titolo.textContent="|" + title + "|";
        const cantante=document.createElement('span');
        cantante.textContent=artist;
        const album=document.createElement('span');
        album.textContent=albumName;

        track.appendChild(titolo);
        track.appendChild(cantante);
        track.appendChild(album);
        track.appendChild(img);
        library.appendChild(track);
    }
}

const OAuth=document.querySelector('#OAuth');
OAuth.addEventListener('submit',SearchSong);

let token;
const client_id = "5f7a75439d5a4be9b034b9ed3137d765";
const client_secret = "fa215063a3cd4a1b989b08d1667e3aa6";

fetch("https://accounts.spotify.com/api/token",
    {
        method:"post",
        body: 'grant_type=client_credentials',
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenResponse).then(onTokenJson);

function onTokenJson(json)
{
	token= json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}