import "../scss/main.scss";
export let musicList = []; // 밑에서 객체 배열로 저장

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/") {
    let shuffle = false;
    const player = document.querySelector("#player");
    const audio = player.querySelector("#audio-player");
    const albumCover = player.querySelector("img");
    const title = player.querySelector(".title");
    const singer = player.querySelector(".singer");
    let currentTimeInfo = document.querySelector(".current");
    let bar = document.querySelector(".bar");
    const currentBar = player.querySelector(".current-bar");
    let fulltime = document.querySelector(".full");
    const prevBtn = player.querySelector("#prev-btn");
    const playBtn = player.querySelector("#play-btn");
    const nextBtn = player.querySelector("#next-btn");
    const subprevBtn = document.querySelector("#sub-prev-btn");
    const subplayBtn = document.querySelector("#sub-play-btn");
    const subnextBtn = document.querySelector("#sub-next-btn");
    const modeIcon = document.querySelector(
      "#player .prograss .heart-vol .mode-icon"
    );
    const heartIcon = document.querySelector(
      "#player .prograss .heart-vol .heart-icon"
    );
    let muteToggle = document.getElementById("mute-toggle");
    let volumeSlider = document.getElementById("volume-slider");

    //------------뮤직 플레이어 setting-----------//
    if (!audio.src) {
      albumCover.src = "/public/client/scss/img/nosong.png";
      currentTimeInfo.style.display = "none";
    }

    //개별 audio duration load
    audio.addEventListener("loadedmetadata", function () {
      currentTimeInfo.style.display = "block";
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
      subplayBtn.classList.add("fa-pause");
      subplayBtn.classList.remove("fa-play");
      albumCover.style.animationPlayState = "running";
    }
    function pauseMusic() {
      audio.pause();
      playBtn.classList.remove("fa-pause");
      playBtn.classList.add("fa-play");
      subplayBtn.classList.remove("fa-pause");
      subplayBtn.classList.add("fa-play");
      albumCover.style.animationPlayState = "paused";
    }

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
    nextBtn.addEventListener("click", () => {
      if (audio.src) {
        nextSong();
      }
    });

    subprevBtn.addEventListener("click", () => {
      if (audio.src) {
        prevSong();
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
      if (audio.src) {
        var percent = e.offsetX / bar.offsetWidth;
        audio.currentTime = percent * audio.duration;
        currentBar.style.width = percent * 100 + "%";
      }
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

    //------------뮤직 플레이어 Setting END-----------//
    //------------------------------------------------//
    //------------------------------------------------//

    //-------------플레이리스트---------------//
    //---------------------------------------//
    //---------- 플레이리스트 view setting -------------//
    const header_playlistBtn = document.querySelector(".playlist-btn");
    const header_mainCate = document.querySelector(".main-category");
    const header_playlistWrap = document.querySelector(".playlist-wrap");
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

    let myPLAYLIST = [];
    let myHEART = [];
    let currentSongIndex = 0; // 갱신
    const songWrap = document.querySelector(
      ".header .header-wrap .playlist-wrap .playlist .songs-wrap"
    );

    //음악 좋아요(하트아이콘)
    heartIcon.addEventListener("click", () => {
      //하트 리스트에 없을 때
      if (heartIcon.classList.contains("fa-regular")) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa");
        if (audio.src) {
          AddHeart();
        }
      } else {
        // 하트리스트 취소할 때
        heartIcon.classList.add("fa-regular");
        heartIcon.classList.remove("fa");
        if (audio.src) {
          DeleteHeart();
        }
      }
    });

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
    function nextSong() {
      let nextSongIndex = null;
      if (shuffle) {
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
    //서버에서 데이터 GET
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/data");
    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        if (data.myPL) {
          const id = Date.now();
          data.myPL.forEach((song, index) => {
            song.id = id + index;
            myPLAYLIST.push(song);
          });
          PLview();
        }
        if (data.myHT) {
          data.myHT.forEach((song, index) => {
            myHEART.push(song);
          });
        }
      } else {
        console.error("Error: " + xhr.status);
      }
    };
    xhr.send();

    //플레이리스트 그려내기
    function PLview() {
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
        const playlistEachSong = PLSongWrap.querySelector(
          ".playlist-each-song"
        );
        playlistEachSong.addEventListener("click", () => {
          EachSongPlay(playlistEachSong);
          ActiveSong(playlistEachSong);
          currentSongIndex = myPLAYLIST.findIndex(
            (song) => song.id === Number(playlistEachSong.getAttribute("id"))
          );
        });
        PLSongWrap.querySelector(".songDelete").addEventListener(
          "click",
          () => {
            DeleteSong(playlistEachSong);
          }
        );
      });
    }
    //플레이리스트 곡 삭제
    function DeleteSong(eachSong) {
      if (eachSong.getAttribute("id") === audio.getAttribute("id")) {
        if (myPLAYLIST.length === 1) {
          EmptyPlayer();
          myPLAYLIST = myPLAYLIST.filter(
            (song) => song.id != eachSong.getAttribute("id")
          );
          songWrap.innerHTML = ``;
          PLview();
        } else {
          nextSong();
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

    ///// 개별 곡(차트 + 앨범 곡) 클릭 시 플레이리스트에 담은 후 재생
    const eachSong = document.querySelectorAll(".each-song");
    eachSong.forEach((element) => {
      element.addEventListener("click", () => {
        handleSongClick(element);
      });
    });
    //-------------플레이리스트 END---------------//
    //-------------------------------------------//

    // -------------뮤비 재생 ------------- //
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
    // -------------뮤비 재생 end------------- //
  } else if (window.location.pathname === "/mypage") {
    const fileInput = document.querySelector(".img-input");
    const thumbnail = document.querySelector(".preview");
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        thumbnail.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  // header On&Off
  const menuBtn = document.querySelector(".header-btn");
  const menuClose = document.querySelector(".header-wrap i");
  const close = document.querySelector(".playlist-header .close");
  const header = document.querySelector(".header");
  const headerLink = header.querySelectorAll(".main-category.on a");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      header.classList.add("on");
    });
  }
  if (menuClose) {
    menuClose.addEventListener("click", () => {
      header.classList.remove("on");
    });
    close.addEventListener("click", () => {
      header.classList.remove("on");
    });
    headerLink.forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("on");
      });
    });
  }
  function handleResize() {
    if (window.innerWidth > "900") {
      header.classList.remove("on");
    }
  }

  window.addEventListener("resize", handleResize);

  //모바일 브라우저 100vh 문제
  //let vh = window.innerHeight;
  //document.documentElement.style.setProperty("--vh", `${vh}px`);
});
