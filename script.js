const buttonsPlayers = document.querySelectorAll(".btn-play")
const title = document.querySelectorAll("h1")
const subtitle = document.querySelectorAll("h2")
const musicPoster = document.querySelectorAll(".poster img")
const music = document.querySelector("#play-music")
const video = document.querySelector("video")
const videoSource = document.querySelector("source")
const main = document.querySelector("main")
const imageVisibility = document.querySelector(".visibility img")
const timeStart = document.querySelectorAll(".time-start")
const timeEnd = document.querySelectorAll(".time-end")
const buttonPlayPauseVideo = document.querySelector(".btn-play-video")
const progressBars = document.querySelectorAll(".progress")
const buttonSpeedUp = document.querySelectorAll(".btn-next")
const buttonMinimize = document.querySelector("#btn-minimize")

let statusMusic = "paused"

for(let button of buttonsPlayers) {
    button.addEventListener("click", () => {
        if(statusMusic == "paused") {
            playMusicAndVideo("sim")
            statusMusic = "playing"
        } else {
            pauseMusicAndVideo("não")
            statusMusic = "paused"
        }
    })
}

function loopsThroughAllImageElements(element, url) {
    let contador = 0
    while(contador < element.length) {
        element[contador].setAttribute("src", url)
        contador++
    }
}

function loopsThroughAllTextElements(element, text) {
    for(let title of element) {
        title.textContent = text
    }
}

function showAndHidePlay() {
    imageVisibility.addEventListener("click", () => {
        main.classList.toggle("hide")
        filterVideo()
    
        if(imageVisibility.getAttribute("src") === "./assets/button/visibility_off.svg") {
            imageVisibility.setAttribute("src", "./assets/button/visibility.svg")
        } else {
            imageVisibility.setAttribute("src", "./assets/button/visibility_off.svg")
        }
    })

}

function showAndHideVideo(value) {
    video.style.display = value
}

function changePosterAndTitle(poster, musicTitle, musicSubtitle) {
    loopsThroughAllImageElements(musicPoster,  `./assets/album/${poster}`)
    loopsThroughAllTextElements(title, musicTitle)
    loopsThroughAllTextElements(subtitle, musicSubtitle)
}

function playPauseVideo() {
    buttonPlayPauseVideo.addEventListener("click", () => {
        if(statusMusic == "paused") {
            playMusicAndVideo("sim")
            statusMusic = "playing"
            buttonPlayPauseVideo.setAttribute("src", "./assets/button/pause.svg")
        } else {
            pauseMusicAndVideo("sim")
            statusMusic = "paused"
            buttonPlayPauseVideo.setAttribute("src", "./assets/button/play.svg")
            changePosterAndTitle("poster-spare-me-great-lord.jpg", "不好惹", "阿萨Aza")
        }

    })
}


const intervalId = []
function playMusicAndVideo(showVideo) {
    buttonPlayPauseVideo.setAttribute("src", "./assets/button/pause.svg")
    loopsThroughAllImageElements(buttonsPlayers, "./assets/button/pause.svg")

    changePosterAndTitle("poster-spare-me-great-lord.jpg", "不好惹", "阿萨Aza")

    if(showVideo === "sim") {
        showAndHideVideo("block")
    }

    music.play()
    video.play()
    intervalId[0] = setInterval(showMusicTime, 1000)
    intervalId[1] = setInterval(showProgress, 1000)
}

function pauseMusicAndVideo(hideVideo) {
    buttonPlayPauseVideo.setAttribute("src", "./assets/button/play.svg")
    loopsThroughAllImageElements(buttonsPlayers, "./assets/button/play.svg")
    loopsThroughAllImageElements(musicPoster,  "./assets/album/poster.png")
    loopsThroughAllTextElements(title, "Acorda Devinho")
    loopsThroughAllTextElements(subtitle, "Banda Rocketseat")

    if(hideVideo === "não") {
        showAndHideVideo("none")
    }

    music.pause()
    video.pause()
    clearInterval(intervalId[0])
    clearInterval(intervalId[1])
}

function showProgress() {
    const durationMusic = Math.floor(music.duration)
    let = timeAtual = Math.floor(music.currentTime)

    let percentage = Math.floor((timeAtual / durationMusic) * 100)

    for(let element of progressBars) {
        element.style.width = `${percentage}%`
    }
    console.log("Tempo Total: ", durationMusic, " Tempo Atual ", timeAtual, " Porcentagem", percentage)
}

function showMusicTime() {
    let minuts = Math.floor(music.currentTime / 60)
    let seconds = Math.floor(music.currentTime % 60)

    for(let element of timeStart) {
        element.textContent = `${String(minuts).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }
    console.log("minutos ", minuts, " segundos ", seconds)
}

function showMusicDuration() {
    const durationMinuts = Math.floor(music.duration / 60)
    const durationSeconds = Math.floor(music.duration % 60)
    timeEnd[0].textContent = `${durationMinuts}:${durationSeconds}`
    timeEnd[1].textContent = `${durationMinuts}:${durationSeconds}`
}

function filterVideo() {
    video.classList.toggle("filter-video")
}

function minimizePlayMusic() {
    buttonMinimize.addEventListener("click", () => {
        main.classList.toggle("minimize")

        if(main.className === "minimize") {
            buttonMinimize.setAttribute("src", "./assets/button/to-top.svg")
        } else {
            buttonMinimize.setAttribute("src", "./assets/button/to-bottom.svg")
        }

        filterVideo()

    })
}

showAndHidePlay()
playPauseVideo()
minimizePlayMusic()
window.onload = () => showMusicDuration()