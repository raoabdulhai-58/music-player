const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.getElementById("title");
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let progress = document.getElementById("progress");
let current_time = document.getElementById("current_time");
let total_duration = document.getElementById("duration");
let progress_div = document.getElementById("progress_div");
let looping = document.getElementById("loop_btn");
let shuffle = document.getElementById("shuffle_btn");


let isplaying = false;

const songs = [
  {
     name : "song1",
     image: "image1"
},
  {
     name : "song2",
     image: "image2"
},
  {
     name : "song3",
     image: "image3"
},
{
  name: "song4",
  image: "image4"
}
]

const playMusic =()=>{
    isplaying = true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
  }

const pauseMusic =()=>{
    isplaying = false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
  }

  play.addEventListener("click",()=>{
     isplaying ? pauseMusic() : playMusic();
  })

  // changing music 

  const loadMusic =  (songs)=>{
     title.innerHTML= songs.name;
     music.src= "music/"+ songs.name + ".mp3";
     img.src = "images/"+ songs.image + ".gif"
  }
  // loadMusic(songs[2])
  let songIndex = 0;

  const nextSong = ()=>{
    songIndex = (songIndex + 1) % songs.length;
    loadMusic(songs[songIndex])
    playMusic()
  }

  const prevSong = ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadMusic(songs[songIndex])
    playMusic()
  }

  // prpgress bar 

  music.addEventListener("timeupdate", (event)=>{
    const{currentTime , duration} = event.srcElement;
    console.log(currentTime)
    console.log(duration)
    let progress_time = (currentTime / duration) * 100;
    progress.style.width=`${progress_time}%`;
    
    // music duration

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if(sec_duration < 10){
      sec_duration = `0${sec_duration}`
    }
    let tot_duration = `${min_duration}:${sec_duration}`

    if(duration){
      total_duration.textContent = `${tot_duration}`;
    }

    // current duration

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime < 10 ){
      sec_currentTime = `0${sec_currentTime}`;
    }
    current_time.textContent = `${min_currentTime}:${sec_currentTime}`;

  })


  // progress bar onclick functionality

  progress_div.addEventListener("click",(event)=>{
        const {duration} = music;
        let move_progress = (event.offsetX/event.srcElement.clientWidth) * duration;
        music.currentTime = move_progress;
  })


   // LOOP ON OFF 
  music.loop=false;
  const LoopOn =()=>{
    if(music.loop == false){
     music.loop = true;
     looping.style.color = 'grey'
    }
    else{
      music.loop = false;
      looping.style.color = '#111'
      music.addEventListener("ended",nextSong)
    }
  }

  looping.addEventListener("click",LoopOn)

  // shuffle functionality

let getRandomNumber = (min,max)=>{
   let step1 = max-min+1;
   let step2 = Math.random()*step1;
   let result = Math.floor(step2)+min;
   return result;
}
shuffle.addEventListener("click",()=>{
    let random_index = getRandomNumber(0,songs.length-1);
    songIndex = random_index;
    loadMusic(songs[songIndex])
    playMusic()
})

  music.addEventListener("ended",nextSong)
  next.addEventListener("click",nextSong);
  prev.addEventListener("click",prevSong)