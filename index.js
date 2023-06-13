console.log("Welcome to spotify");

//intialize variables
let songindex = 0;
let audioElement = new Audio('/songs/ikvaariaa.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//Array of objects like songName, path of song, coverPath

let songs = [
    { songName: "Ik Vaari Aa", songPath: "songs/ikvaariaa.mp3", coverPath: "/images/ik_vaari_aa.jpg" },
    { songName: "Humsafar", songPath: "/songs/hamsafar.mp3", coverPath: "/images/hamsafar.jpg" },

    { songName: "Let me love You", songPath: "/songs/letmeloveu.mp3", coverPath: "images/letmeloveu.jpg" },
    { songName: "Bahubali", songPath: "/songs/jiyorebahubali.mp3", coverPath: "images/bahubali.jpg" },
    { songName: "Kar Gayi chull", songPath: "/songs/kargyichull.mp3", coverPath: "images/hip_hop.jpg" },
    { songName: "Paro", songPath: "/songs/paro.mp3", coverPath: "images/ppk2.jpg" },
    { songName: "Raabta", songPath: "/songs/raabta.mp3", coverPath: "images/rabta.jpg" },
    { songName: "Shape of You", songPath: "/songs/shapeofyou.mp3", coverPath: "images/shape_of_you.jpg" }
]
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//audioElement.play();
//Handle master Play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbars
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makePlaysAll = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e);
        makePlaysAll();

        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songindex].songPath;
        masterSongName.innerText = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 7) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = songs[songindex].songPath;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = songs[songindex].songPath;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
