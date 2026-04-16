const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sira
let index;

//dongu
let loop = true;

///sarki listesi
const songsList = [
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpeg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpeg",
  },
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpeg",
  },
];

//zaman formatla
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute; //dakika 10 dan küçükse başına 0 koy.
  let second = Math.floor(timeInput % 60); //dakika 10 dan küçükse başına 0 koy.
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//sarkiyi ata
const setSong = (arrayIndex) => {
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playAudio();

  playListContainer.classList.add("hide");
};

//süre geçtikçe
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
  let value = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
  currentProgress.style.width = value;
});

progressBar.addEventListener("click", (event) => {
  //başlangıç noktasi
  let coordStart = progressBar.getBoundingClientRect().left;

  console.log(coordStart);

  let coordEnd = event.clientX;

  console.log(coordEnd);

  console.log(progressBar.offsetWidth);

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  progress = Math.max(0, Math.min(progress, 1)); //değeri 0-1 arasında tutar dışarı tıklayınca

  console.log(progress);

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  playAudio();
});

//sarki listesi aç
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//sarki listesini kapat
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//şarkı bittiğinde tetiklenir
audio.onended = () => {
  nextSong();
};

//sarkiyi cal
const playAudio = () => {
  audio.play();

  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

//sarkiyi durdur
const pauseAudio = () => {
  audio.pause();

  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
};

//siradaki şarki geç
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    index = randIndex;
  }
  setSong(index);
};

//önceki şarkiya geç
const previousSong = () => {
  if (index > 0) {
    index = index - 1;
  } else {
    index = songsList.length - 1;
  }

  setSong(index);
};

//ekran yüklendiğinde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlaylist();
};

//sarki listesi oluştur
const initializePlaylist = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `
  <li class="playlistSong" onclick="setSong(${i})">
    <div class="playlist-image-container">
      <img src="${songsList[i].image}" />
    </div>

    <div class="playlist-song-details">
      <span class="playlist-song-name">
        ${songsList[i].name}
      </span>

      <span class="playlist-song-artist-album">
        ${songsList[i].artist}
      </span>
    </div>
  </li>
`;
  }
};

//dongu butonu tiklanirsa
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
  } else {
    repeatButton.classList.add("active");
    loop = true;
  }
});

//kariştirici tiklanirsa
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});

//tiklanma dinleyicileri

//durdur
pauseButton.addEventListener("click", pauseAudio);

//oynat
playButton.addEventListener("click", playAudio);

//siradaki tiklanirsa
nextButton.addEventListener("click", nextSong);

//önceki tiklanirsa
prevButton.addEventListener("click", previousSong);
