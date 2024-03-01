let songIndex = 0
let song = new Audio('./Songs/1.mp3')
let pause = document.getElementById('pause')
let play = document.getElementById('play')
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let back = document.getElementById('back')
let skip = document.getElementById('skip')
let startingTime = document.getElementById('startingTime')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songNames = Array.from(document.getElementsByClassName('songName'))
let masterSongName = document.getElementById('masterSongName')
let endingsTime = Array.from(document.getElementsByClassName('endingTime'))
let songDuration = document.getElementById('songDuration')
let progress = 0
let progressBar = document.getElementById('progressBar')
let songs = [
    {songName: "Peaky Blinders", filePath: "./Songs/1.mp3"},
    {songName: "Main Dhoodne X let me down", filePath: "./Songs/2.mp3"},
    {songName: "Jaadugar", filePath: "./Songs/3.mp3"},
    {songName: "Besabriya", filePath: "./Songs/4.mp3"},
    {songName: "Aathma raama", filePath: "./Songs/5.mp3"},
    {songName: "Aaramb hai prachand", filePath: "./Songs/6.mp3"},
    {songName: "Maan meri jaan", filePath: "./Songs/7.mp3"},
    {songName: "Sheesh navata hu", filePath: "./Songs/8.mp3"},
    {songName: "Drive Forever", filePath: "./Songs/9.mp3"},
    {songName: "Shoorveer 3", filePath: "./Songs/10.mp3"},
    {songName: "Raatan Lambeyan", filePath: "./Songs/11.mp3"},
    {songName: "Khalasi: Gotilo", filePath: "/Songs/12.mp3"}
]

// Functions
const updateTime = ()=>{
    startingTime.innerText = song.currentTime
    let ctime = song.currentTime;
  
    let minutes = Math.floor(ctime / 60);
    let seconds = Math.floor(ctime % 60);
    let finalTime = minutes + ":"  + (seconds < 10 ? "0" : "") + seconds    
    startingTime.innerText = finalTime
}
const changeMasterSongName = () =>{
    masterSongName.innerText = songs[songIndex].songName
}

const makeAllNone = () =>{
    Array.from(document.getElementsByClassName('text')).forEach((element)=>{
        element.style.display = "none"
    }) 
}

// Handling Buttons
songItems.forEach((element, i)=> {
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
    changeMasterSongName()
});
skip.addEventListener('click', ()=>{
    song.currentTime += 5
})
back.addEventListener('click', ()=>{
    song.currentTime -= 5
})

play.addEventListener('click', ()=>{
    song.play()
    play.style.display = "none"
    pause.style.display = "block"
    makeAllNone()
    let current = document.getElementsByClassName('text')[songIndex]
    current.style.display = "block"
    current.innerText = "Playing"
    changeMasterSongName()
}) 
pause.addEventListener('click', ()=>{
    song.pause()
    pause.style.display = "none"
    play.style.display = "block"
    let current = document.getElementsByClassName('text')[songIndex]
    current.innerText = "Paused"
})  

previous.addEventListener('click', ()=>{
    if (songIndex <= 0){
        songIndex = 11
    }
    else{
        songIndex -= 1
    }
    song.src = `./Songs/${songIndex+1}.mp3`
    song.currentTime = 0
    song.play()
    makeAllNone()
    changeMasterSongName()
    let current = document.getElementsByClassName('text')[songIndex]
    current.style.display = "block"
    play.style.display = "none"
    pause.style.display = "block"
})

next.addEventListener('click', ()=>{
    if (songIndex >= 11){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    song.src = `./Songs/${songIndex+1}.mp3`
    song.currentTime = 0
    song.play()
    makeAllNone()
    changeMasterSongName()
    let current = document.getElementsByClassName('text')[songIndex]
    current.style.display = "block"
    play.style.display = "none"
    pause.style.display = "block"
})

songNames.forEach((elem)=>{
    elem.addEventListener('click', (e)=>{
        makeAllNone()
        songIndex = parseInt(e.target.id)
        let current = document.getElementsByClassName('text')[songIndex]
        current.style.display = "block"
        song.src = `./Songs/${songIndex+1}.mp3`
        changeMasterSongName()
        song.currentTime = 0
        song.play()
        play.style.display = "none"
        pause.style.display = "block"
    })
})

// Updating ProgressBar
song.addEventListener('timeupdate', ()=>{
    progress = parseInt((song.currentTime/song.duration)*100)
    if (progress > 99){
        if(songIndex >= 11){
            songIndex = 0
        }
        else { songIndex += 1}
        progress = 0
        makeAllNone()
        let current = document.getElementsByClassName('text')[songIndex]
        current.style.display = "block"
        song.src = `./Songs/${songIndex+1}.mp3`
        changeMasterSongName()
        song.currentTime = 0
        song.play()
        play.style.display = "none"
        pause.style.display = "block"   
    }
    progressBar.value = progress
    updateTime()
})

progressBar.addEventListener('change', ()=>{
    song.currentTime = progressBar.value * song.duration / 100
})
// Updating Timestamp
song.addEventListener('loadedmetadata', ()=>{
    let duration = song.duration;
  
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    let songduration = minutes + ":"  + (seconds < 10 ? "0" : "") + seconds    
    songDuration.innerText = songduration
});

// Handling KeyStrokes
document.addEventListener('keydown', (e)=>{
    if (e.code == "Space"){
        if (play.style.display === "none"){
            song.pause()
            play.style.display = "block"
            pause.style.display = "none"
            makeAllNone()
            let current = document.getElementsByClassName('text')[songIndex]
            current.style.display = "block"
            current.innerText = "Paused"
            changeMasterSongName()
        }
        else{
            song.play()
            pause.style.display = "block"
            play.style.display = "none"
            makeAllNone()
            let current = document.getElementsByClassName('text')[songIndex]
            current.style.display = "block"
            current.innerText = "Playing"
            changeMasterSongName()
        }
    }
    else if(e.code == "ArrowRight"){
        song.currentTime += 5
    }
    else if(e.code == "ArrowLeft"){
        song.currentTime -= 5
    }
    else if(e.code == "ArrowDown"){
        if (song.volume == 0) {console.log("volume lowest")}
        song.volume -= .1
    }
    else if (e.code == "ArrowUp"){
        if (song.volume == 1) {console.log("volume lowest")}
        song.volume += .1
    }
});
