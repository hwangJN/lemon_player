import "../scss/main.scss";

document.addEventListener("DOMContentLoaded", function () {
  //뮤직플레이어
  const player = document.querySelector("#player");
  const audio = player.querySelector("#audio-player");
  const albumCover = player.querySelector("img");
  const title = player.querySelector(".title");
  const singer = player.querySelector(".singer");
  let currentTimeInfo = document.querySelector(".current");
  let bar = document.querySelector(".bar");
  const currentBar = player.querySelector(".current-bar");
  let fulltime = document.querySelector(".full");
  const playBtn = player.querySelector("#play-btn");
  var muteToggle = document.getElementById("mute-toggle");
  var volumeSlider = document.getElementById("volume-slider");

  //개별 audio duration load
  audio.addEventListener("loadedmetadata", function () {
    let duration = audio.duration;
    let totalMin = Math.floor(duration / 60);
    let totlaMin2 = String(totalMin).padStart(2, "0");
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    fulltime.innerHTML = `${totlaMin2}:${totalSec}`;
  });
  function playMusic() {
    audio.play();
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
    albumCover.style.animationPlayState = "running";
  }
  function pauseMusic() {
    audio.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    albumCover.style.animationPlayState = "paused";
  }

  //play & pause
  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  //노래 재생 끝났을 때
  audio.addEventListener("ended", () => {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    albumCover.style.animationPlayState = "paused";
    currentBar.style.width = "0%";
    currentTimeInfo.innerHTML = "00:00";
  });

  //재생 progress bar width
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

  //prograss bar 클릭 부분으로 audio jump
  bar.addEventListener("click", function (e) {
    var percent = e.offsetX / bar.offsetWidth;
    audio.currentTime = percent * audio.duration;
    currentBar.style.width = percent * 100 + "%";
  });

  //음량조절
  volumeSlider.addEventListener("input", function () {
    audio.volume = volumeSlider.value;
    if (audio.volume == 0) {
      muteToggle.classList.add("fa-volume-mute");
      muteToggle.classList.remove("fa-volume-up");
    } else {
      muteToggle.classList.remove("fa-volume-mute");
      muteToggle.classList.add("fa-volume-up");
    }
  });

  var vol_slider = document.querySelector("#volume-slider");
  //음소거
  muteToggle.addEventListener("click", function () {
    volumeSlider.value = "0";
    audio.volume = volumeSlider.value;
    muteToggle.classList.add("fa-volume-mute");
    muteToggle.classList.remove("fa-volume-up");
    vol_slider.style.background =
      "linear-gradient(to right,  rgb(236, 236, 236) 0%, rgb(236, 236, 236) 100%)";
  });
  var gradient_value = 100;
  //vol_slider.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 '+gradient_value * 0.5 +'%, rgb(236, 236, 236) ' +gradient_value *  0.5 + '%, rgb(236, 236, 236) 100%)';
  vol_slider.addEventListener("input", function (event) {
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

  /////////////

  const eachSong = document.querySelectorAll(".each-song");
  eachSong.forEach((element) => {
    element.addEventListener("click", () => {
      const music = element.getAttribute("music");
      const eachCover = element.querySelector("img").src;
      const eachTitle = element.querySelector(".title").innerHTML;
      const eachSinger = element.querySelector(".singer").innerHTML;

      audio.src = `/public/client/source/${music}.mp3`;
      playMusic();
      albumCover.src = `${eachCover}`;
      title.innerHTML = eachTitle;
      singer.innerHTML = eachSinger;
      currentBar.style.width = "0%";
    });
  });

  //뮤비 재생
  const eachMv = document.querySelectorAll(".each-mv");
  const playMv = document.querySelector("#play-video");
  const close = playMv.querySelector(".close");
  const iframe = playMv.querySelector("iframe");

  eachMv.forEach((mv) => {
    mv.addEventListener("click", () => {
      pauseMusic();
      const youtubeID = mv.getAttribute("id");
      iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeID}?enablejsapi=1&version=3&playerapiid=ytplayer `;
      playMv.style.display = "block";

      // 스크롤 위치
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const topPosition =
        scrollTop + window.innerHeight / 2 - playMv.offsetHeight / 2;
      playMv.style.top = `${topPosition}px`;
      playMv.style.left = `50%`;
      playMv.style.transform = `translateX(-50%)`;

      close.addEventListener("click", () => {
        //유튜브 재생 중지
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"' + "stopVideo" + '","args":""}',
          "*"
        );
        playMv.style.display = "none";
      });
    });
  });
});
