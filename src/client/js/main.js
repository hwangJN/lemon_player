import "../scss/main.scss";
import "../js/header.js";
import "../js/mypage.js";
import "../js/mv.js";
import "../js/api.js";
import { header } from "../js/header.js";

export let myPLAYLIST = [];
export let myHEART = [];

let player = null;
let audio = null;
let albumCover = null;
let title = null;
let singer = null;
let currentTimeInfo = null;
let fulltime = null;
let bar = null;
let currentBar = null;
let prevBtn = null;
let playBtn = null;
let nextBtn = null;
let modeIcon = null;
let heartIcon = null;

let header_mainCate = null;
let header_playlistWrap = null;
let songWrap = null;

let subprevBtn = null;
let subplayBtn = null;
let subnextBtn = null;

let currentSongIndex = 0; // 현재 재생 곡 idx
let shuffle = false; //모드

function playMusic() {
  audio.play();
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
  subplayBtn.classList.add("fa-pause");
  subplayBtn.classList.remove("fa-play");
  albumCover.style.animationPlayState = "running";
}
export function pauseMusic() {
  audio.pause();
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  subplayBtn.classList.remove("fa-pause");
  subplayBtn.classList.add("fa-play");
  albumCover.style.animationPlayState = "paused";
}

function AddHeart() {
  const songID = audio.getAttribute("data-song-id");
  // 유저 db - playlist에 곡 추가
  fetch("/heart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songID, mode: "Add" }),
  }).then((response) => {
    if (response.ok) {
      myHEART.push({
        title: title.innerHTML,
      });
    } else {
      throw new Error("Error adding song to playlist");
    }
  });
}
function DeleteHeart() {
  const songID = audio.getAttribute("data-song-id");
  // 유저 db - playlist에 곡 추가
  fetch("/heart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songID, mode: "Delete" }),
  }).then((response) => {
    if (response.ok) {
      myHEART = myHEART.filter((song) => song.title !== title.innerHTML);
    } else {
      throw new Error("Error adding song to playlist");
    }
  });
}

//플레이어에서 재생중인 음악 ACTIVE(in 플레이리스트)
function ActiveSong(element) {
  audio.id = element.getAttribute("id");
  audio.setAttribute("data-song-id", element.getAttribute("data-song-id"));
  const PLSongs = songWrap.querySelectorAll(".playlist-each-song");
  PLSongs.forEach((song) => {
    song.querySelector(".title").style.color = "black";
    song.querySelector(".singer").style.color = "black";
    song.querySelector("img").style.filter = "none";
  });
  element.querySelector(".title").style.color = "#650dec";
  element.querySelector(".title").style.fontWeight = "500";
  element.querySelector(".singer").style.fontWeight = "400";
  element.querySelector(".singer").style.color = "#650dec";
  const playAni = document.querySelector(".playAni");
  playAni.style.display = "flex";
  element.appendChild(playAni);
  element.querySelector("img").style.filter = "brightness(0.75)";
}
//플레이어 음악 change 함수
function changeMusicInfo(index) {
  console.log(index);
  //
  audio.src = `/public/client/source/${myPLAYLIST[index].music}.mp3`;
  albumCover.src = `${myPLAYLIST[index].albumCover}`;
  title.innerHTML = myPLAYLIST[index].title;
  singer.innerHTML = myPLAYLIST[index].singer;
  currentBar.style.width = "0%";
  playMusic();
  const PLSongs = songWrap.querySelectorAll(".playlist-each-song");
  ActiveSong(PLSongs[index]);
  let exist = undefined;
  exist = myHEART.find((song) => String(song.title) === title.innerHTML);
  if (exist) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa");
  } else {
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa");
  }
}
// 강제 이전곡 재생(PL)
function prevSong() {
  let setIndex = null;
  let prevSongIndex = null;
  if (currentSongIndex === 0) {
    setIndex = myPLAYLIST.length;
  } else {
    setIndex = currentSongIndex;
  }
  if (shuffle) {
    prevSongIndex = Math.floor(Math.random() * myPLAYLIST.length);
  } else {
    prevSongIndex = (setIndex - 1) % myPLAYLIST.length;
  }
  changeMusicInfo(prevSongIndex);
  currentSongIndex = prevSongIndex;
}
// 강제 다음곡 재생(PL)
function nextSong(delmode = false) {
  // delmode : 현재 재생곡 삭제 -> 자동 다음 곡 재생 -> shuffle 모드 해제
  let nextSongIndex = null;
  if (shuffle && !delmode) {
    nextSongIndex = Math.floor(Math.random() * myPLAYLIST.length);
  } else {
    nextSongIndex = (currentSongIndex + 1) % myPLAYLIST.length;
  }
  currentSongIndex = nextSongIndex;
  changeMusicInfo(nextSongIndex);
}
function EmptyPlayer() {
  audio.pause();
  audio.removeAttribute("src");
  albumCover.src = "/public/client/scss/img/nosong.png";
  currentTimeInfo.style.display = "none";
  title.innerHTML = "현재 재생중인 곡이 없습니다";
  singer.innerHTML = "곡을 추가해보세요";
  albumCover.style.animationPlayState = "paused";
}

//플레이리스트 그려내기
export function PLview() {
  const playAni = document.createElement("div");
  playAni.classList.add("playAni");
  playAni.innerHTML = `
    <div class="stroke"></div>
    <div class="stroke"></div>
    <div class="stroke"></div>
    <div class="stroke"></div>
    <div class="stroke"></div>
  `;
  myPLAYLIST.forEach((eachSong) => {
    songWrap.append(playAni);
    const PLSongWrap = document.createElement("div");
    PLSongWrap.classList.add("PL-song-wrap");
    PLSongWrap.innerHTML = `
    <div class="playlist-each-song" data-song-id=${eachSong._id} music="${eachSong.music}" id="${eachSong.id}" >
      <img class="coverImg" src="${eachSong.albumCover}"/>
      <div class="song-detail">
        <div class="songInfo">
          <span class="title">${eachSong.title}</span>
          <span class="singer">${eachSong.singer}</span>
        </div>
      </div>
    </div>
    <i class="fa fa-minus songDelete"></i>
    `;
    songWrap.append(PLSongWrap);
    const playlistEachSong = PLSongWrap.querySelector(".playlist-each-song");
    playlistEachSong.addEventListener("click", () => {
      EachSongPlay(playlistEachSong);
      ActiveSong(playlistEachSong);
      currentSongIndex = myPLAYLIST.findIndex(
        (song) => song.id === Number(playlistEachSong.getAttribute("id"))
      );
    });
    PLSongWrap.querySelector(".songDelete").addEventListener("click", () => {
      DeleteSong(playlistEachSong);
    });
  });
}
//플레이리스트 곡 삭제
function DeleteSong(eachSong) {
  //현재 재생중인 곡 삭제
  if (eachSong.getAttribute("id") === audio.getAttribute("id")) {
    if (myPLAYLIST.length === 1) {
      EmptyPlayer();
      myPLAYLIST = myPLAYLIST.filter(
        (song) => song.id != eachSong.getAttribute("id")
      );
      songWrap.innerHTML = ``;
      PLview();
    } else {
      nextSong(true);
      let nextIdx =
        myPLAYLIST.findIndex(
          (song) => String(song.id) === String(eachSong.getAttribute("id"))
        ) + 1;
      if (nextIdx > myPLAYLIST.length - 1) {
        nextIdx = 0;
      }
      const nextID = String(myPLAYLIST[nextIdx].id);
      songWrap.innerHTML = ``;
      myPLAYLIST = myPLAYLIST.filter(
        (song) => song.id != eachSong.getAttribute("id")
      );
      PLview();
      let nextItem = null;
      const PLSongs = songWrap.querySelectorAll(".playlist-each-song");
      for (let song of PLSongs) {
        if (song.getAttribute("id") === String(nextID)) {
          nextItem = song;
          break;
        }
      }
      if (nextItem) {
        currentSongIndex = myPLAYLIST.findIndex(
          (song) => song.id === Number(nextItem.getAttribute("id"))
        );
        ActiveSong(nextItem);
      }
    }
  } else {
    //재생중이지 않은 곡 삭제
    myPLAYLIST = myPLAYLIST.filter(
      (song) => song.id != eachSong.getAttribute("id")
    );
    songWrap.innerHTML = ``;
    PLview();
    const PLSongs = songWrap.querySelectorAll(".playlist-each-song");
    let currentSong = null;
    for (let song of PLSongs) {
      if (
        String(song.getAttribute("id")) === String(audio.getAttribute("id"))
      ) {
        currentSong = song;
        break;
      }
    }
    if (currentSong) {
      currentSongIndex = myPLAYLIST.findIndex(
        (song) => song.id === Number(currentSong.getAttribute("id"))
      );
      ActiveSong(currentSong);
    }
  }
  handleSongDelete(eachSong);
}
//플레이리스트 곡 추가
function AddSong(songElem) {
  const id = Date.now();
  myPLAYLIST.push({
    title: songElem.querySelector(".title").innerHTML,
    singer: songElem.querySelector(".singer").innerHTML,
    albumCover: songElem.querySelector("img").src,
    music: songElem.getAttribute("music"),
    _id: songElem.getAttribute("data-song-id"),
    id: id,
  });
  songWrap.innerHTML = ``;
  PLview();
  const songs = songWrap.querySelectorAll(".playlist-each-song");

  EachSongPlay(songs[songs.length - 1]);
  ActiveSong(songs[songs.length - 1]);
  currentSongIndex = songs.length - 1;
  header_mainCate.classList.remove("on");
  header_mainCate.classList.add("off");
  header_playlistWrap.classList.remove("off");
  header_playlistWrap.classList.add("on");
  header.classList.add("on");
}
//////// 플레이어에서 음악 재생
function EachSongPlay(element) {
  const music = element.getAttribute("music");
  const eachCover = element.querySelector("img").src;
  const eachTitle = element.querySelector(".title").innerHTML;
  const eachSinger = element.querySelector(".singer").innerHTML;
  audio.src = `/public/client/source/${music}.mp3`;
  audio.id = element.getAttribute("id");
  audio.setAttribute("data-song-id", element.getAttribute("data-song-id"));
  playMusic();
  albumCover.src = `${eachCover}`;
  title.innerHTML = eachTitle;
  singer.innerHTML = eachSinger;
  currentBar.style.width = "0%";

  let exist = undefined;

  //유저 heart 저장 여부
  exist = myHEART.find((song) => String(song.title) === eachTitle);
  if (exist) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa");
  } else {
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa");
  }
}

/////// 메인 화면에 있는 곡 클릭시 userPL(DB)에 추가 & 해당 곡 화면 플리에 추가
function handleSongClick(songElem) {
  const songId = songElem.dataset.songId;
  // 음악 재생 시 화면 playlist에 바로 추가하기
  const playList = document.querySelector(
    ".header .header-wrap .playlist-wrap .playlist"
  );
  // 유저 db - playlist에 곡 추가
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
  }).then((response) => {
    if (response.ok) {
      AddSong(songElem);
      playList.scrollTop = songWrap.scrollHeight;
    } else {
      throw new Error("Error adding song to playlist");
    }
  });
}
/////// 플레이리스트에 있는 곡 삭제 시 user db에서 해당 곡 삭제
function handleSongDelete(songElem) {
  const songId = songElem.getAttribute("data-song-id");

  // 유저 db - playlist에 곡 추가
  fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
  }).then((response) => {
    if (response.ok) {
      console.log("OK");
    } else {
      console.log("ERROR!");
    }
  });
}

if (window.location.pathname === "/") {
  //------------뮤직 플레이어 setting-----------//
  shuffle = false;
  player = document.querySelector("#player");
  audio = player.querySelector("#audio-player"); // - audio
  albumCover = player.querySelector("img"); // - 커버이미지
  title = player.querySelector(".title"); // - 곡 제목
  singer = player.querySelector(".singer"); // - 곡 가수
  currentTimeInfo = document.querySelector(".current"); // - 현재 재생 시간
  fulltime = document.querySelector(".full"); // - 음악 전체 재생 시간
  bar = document.querySelector(".bar"); // - 재생 바
  currentBar = player.querySelector(".current-bar"); // - 현재 prograss 바
  prevBtn = player.querySelector("#prev-btn");
  playBtn = player.querySelector("#play-btn");
  nextBtn = player.querySelector("#next-btn");
  //플레이리스트 재생 버튼 -- 같은 기능
  subprevBtn = document.querySelector("#sub-prev-btn");
  subplayBtn = document.querySelector("#sub-play-btn");
  subnextBtn = document.querySelector("#sub-next-btn");

  songWrap = document.querySelector(
    ".header .header-wrap .playlist-wrap .playlist .songs-wrap"
  );

  //셔플 or 전체 재생 아이콘
  modeIcon = document.querySelector("#player .prograss .heart-vol .mode-icon");
  //하트(찜)아이콘
  heartIcon = document.querySelector(
    "#player .prograss .heart-vol .heart-icon"
  );

  //볼륨 관련 요소
  let muteToggle = document.getElementById("mute-toggle");
  let volumeSlider = document.getElementById("volume-slider");

  if (!audio.src) {
    albumCover.src = "/public/client/scss/img/nosong.png";
    currentTimeInfo.style.display = "none";
  }

  //개별 audio duration load - audio full time
  audio.addEventListener("loadedmetadata", function () {
    currentTimeInfo.style.display = "block";
    let duration = audio.duration;
    let totalMin = Math.floor(duration / 60);
    let totlaMin2 = String(totalMin).padStart(2, "0");
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    fulltime.innerHTML = `${totlaMin2}:${totalSec}`;
  });
  //재생 progress bar - audio current time
  audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    currentBar.style.width = `${progressWidth}%`;

    let totalMin = Math.floor(currentTime / 60);
    let totlaMin2 = String(totalMin).padStart(2, "0");
    let totalSec = Math.floor(currentTime % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    currentTimeInfo.innerHTML = `${totlaMin2}:${totalSec}`;
  });

  //play & pause
  playBtn.addEventListener("click", function () {
    if (audio.src) {
      if (audio.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    }
  });
  subplayBtn.addEventListener("click", function () {
    if (audio.src) {
      if (audio.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    }
  });
  prevBtn.addEventListener("click", () => {
    if (audio.src) {
      prevSong();
    }
  });
  subprevBtn.addEventListener("click", () => {
    if (audio.src) {
      prevSong();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (audio.src) {
      nextSong();
    }
  });
  subnextBtn.addEventListener("click", () => {
    if (audio.src) {
      nextSong();
    }
  });

  //노래 재생 끝났을 때
  audio.addEventListener("ended", () => {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    albumCover.style.animationPlayState = "paused";
    //currentBar.style.width = "0%";
    currentTimeInfo.innerHTML = "00:00";
    nextSong();
  });

  //prograss bar 클릭 부분으로 audio jump
  bar.addEventListener("click", function (e) {
    if (audio.src) {
      let percent = e.offsetX / bar.offsetWidth;
      audio.currentTime = percent * audio.duration;
      currentBar.style.width = percent * 100 + "%";
    }
  });

  //음량조절
  let gradient_value = 100;
  volumeSlider.addEventListener("input", function (event) {
    audio.volume = volumeSlider.value;
    if (audio.volume == 0) {
      muteToggle.classList.add("fa-volume-mute");
      muteToggle.classList.remove("fa-volume-up");
    } else {
      muteToggle.classList.remove("fa-volume-mute");
      muteToggle.classList.add("fa-volume-up");
    }
    event.target.style.background =
      "linear-gradient(to right, #FFE283 0%, #FFE283 " +
      gradient_value * event.target.value +
      "%, rgb(236, 236, 236) " +
      gradient_value * event.target.value +
      "%, rgb(236, 236, 236) 100%)";
    event.target.style.background =
      "linear-gradient(to right, #FFE283 0%, #FFE283 " +
      gradient_value * event.target.value +
      "%, rgb(236, 236, 236) " +
      gradient_value * event.target.value +
      "%, rgb(236, 236, 236) 100%)";
  });

  //음소거
  muteToggle.addEventListener("click", function () {
    volumeSlider.value = "0";
    audio.volume = volumeSlider.value;
    muteToggle.classList.add("fa-volume-mute");
    muteToggle.classList.remove("fa-volume-up");
    vol_slider.style.background =
      "linear-gradient(to right,  rgb(236, 236, 236) 0%, rgb(236, 236, 236) 100%)";
  });

  //------------뮤직 플레이어 Setting END-----------//

  //---------- 플레이리스트 view setting -------------//
  const header_playlistBtn = document.querySelector(".playlist-btn");
  header_mainCate = document.querySelector(".main-category");
  header_playlistWrap = document.querySelector(".playlist-wrap");
  const playlist_back = header_playlistWrap.querySelector(".back");
  header_playlistBtn.addEventListener("click", () => {
    header_mainCate.classList.remove("on");
    header_mainCate.classList.add("off");
    header_playlistWrap.classList.remove("off");
    header_playlistWrap.classList.add("on");
  });
  playlist_back.addEventListener("click", () => {
    header_mainCate.classList.remove("off");
    header_mainCate.classList.add("on");
    header_playlistWrap.classList.remove("on");
    header_playlistWrap.classList.add("off");
  });

  //

  //음악 좋아요(하트아이콘)
  heartIcon.addEventListener("click", () => {
    if (audio.src) {
      //하트 리스트에 없을 때
      if (heartIcon.classList.contains("fa-regular")) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa");

        //animation
        heartIcon.classList.add("active");
        setTimeout(() => {
          heartIcon.classList.remove("active");
        }, 1000);

        AddHeart();
      } else {
        // 하트리스트 취소할 때
        heartIcon.classList.add("fa-regular");
        heartIcon.classList.remove("fa");
        DeleteHeart();
      }
    }
  });
  // 재생 모드 설정
  modeIcon.addEventListener("click", () => {
    if (shuffle) {
      modeIcon.classList.add("fa-repeat");
      modeIcon.classList.remove("fa-shuffle");
      shuffle = !shuffle;
    } else {
      modeIcon.classList.remove("fa-repeat");
      modeIcon.classList.add("fa-shuffle");
      shuffle = !shuffle;
    }
  });

  ///// 개별 곡(차트 + 앨범 곡) 클릭 시 플레이리스트에 담은 후 재생
  const eachSong = document.querySelectorAll(".each-song");
  eachSong.forEach((element) => {
    element.addEventListener("click", () => {
      handleSongClick(element);
    });
  });
  //-------------플레이리스트 END---------------//
}
