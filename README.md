# 🍋 LEMON PLAYER
<div align="center" style="text-align: center;">
  <img width="55%" src="https://user-images.githubusercontent.com/101038390/235583014-a98ed475-1981-4ff7-b525-19b3d4a75cf0.png"  />
   <p>
     <br/>
    <a href="https://lemon-player.fly.dev/">🔗 배포 URL</a>
  </p>
</div>

## 📀 제작 동기
- 노마드코더 클론 코딩 챌린지 참여(23.03.30 ~ 23.04.21 3주간) (+🏆[준우승상](https://nomadcoders.co/community/thread/7845))
- Node, MongoDB 관련 경험 쌓기

<br/>

### 개선 Commits (2023.05 ~ ) 
 1. html 메타정보 수정
 url 공유시 (ex 카카오톡) 보여지는 메타정보 setting  
 ```pug
   meta(property="og:title" content="LEMON")
   meta(property="og:description" content="MUSIC PLAYLIST")
   mata(property="og:url" content="https://lemon-player.fly.dev/")
   meta(property="og:image" content="/public/client/scss/img/LEMON-logo.png")
 ```
 
 <br/>
 
 2. modal 스크롤 방지 수정
 뮤비 관련 youtube iframe 모달 사용시 스크롤에 따라 모달 또한 움직이는 불편함을 없애기 위해 개선
 ```javascript
 //mv.js
  mv.addEventListener("click",()=>{
    //...
     body.classList.add("stop-scrolling");
    //...
    }
  )

 ```
 ```scss
 //main.scss
 
 body {
  //...
  &.stop-scrolling {
    height: 100%;
    overflow: hidden;
  }
}
 
 
 ```
 
 <br/>
 
 3. mongodb 업데이트 관련 버그(한번 재생시 재생수 +2) 해결
 콜백함수 대신 exec() -> promise 처리
 
 ```javascript
 
 const updatedSong = await Song.findByIdAndUpdate(songId, {
    $inc: { "meta.play": 1 },
  })
    .exec()
    .then((music) => {
      res.status(200);
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
 ```
 <br/>
 
 4. 삭제 & 랜덤재생 관련 함수 리팩토링
 ```javascript
 //다양한 경우를 고려하여 리팩토링 
 
 // 강제 다음곡 재생(PL)
function nextSong(delmode = false) {
  // delmode : 현재 재생곡 삭제 -> 자동 다음 곡 재생 -> shuffle 모드 해제
  let nextSongIndex = null;

  //현재곡 삭제시 강제 다음곡 - 셔플 적용 x
  if (delmode) {
    // 가장 최근(아래) 추가된 곡 삭제
    if (currentSongIndex >= myPLAYLIST.length) {
      nextSongIndex = 0;
    } else {
      nextSongIndex = currentSongIndex;
    }
  } else {
    // 노래 끝나고 자동 다음곡 & 다음곡 btn
    if (shuffle) {
      nextSongIndex = Math.floor(Math.random() * myPLAYLIST.length);
    } else {
      nextSongIndex = (currentSongIndex + 1) % myPLAYLIST.length;
    }
  }

  currentSongIndex = nextSongIndex;
  changeMusicInfo(nextSongIndex);
}
 
 function DeleteSong(deleteSong) {
  //현재 재생중인 곡 삭제
  if (deleteSong.getAttribute("id") === audio.getAttribute("id")) {
    myPLAYLIST = myPLAYLIST.filter(
      (song) => song.id != deleteSong.getAttribute("id")
    );
    DeleteSongElement(deleteSong); //html 요소 삭제

    if (myPLAYLIST.length === 0) {
      // 한 곡 남아있었을 경우
      EmptyPlayer();
    } else {
      nextSong(true);
    }
  } else {
    //재생중이지 않은 곡 삭제
    const deleteSongIdx = myPLAYLIST.findIndex(
      (song) => String(song.id) === String(deleteSong.getAttribute("id"))
    );
    myPLAYLIST = myPLAYLIST.filter(
      (song) => song.id != deleteSong.getAttribute("id")
    );
    DeleteSongElement(deleteSong); //html 요소 삭제

    //현재 재생곡보다 삭제되는 곡의 인덱스가 작을 경우 현재 재생곡 인덱스 감소
    if (deleteSongIdx < currentSongIndex) {
      currentSongIndex--;
    }
  }
  handleSongDelete(deleteSong); // api 호출
}
 
 ```
 
<br/>

## 📀 프로젝트 소개 & 기능
#### 뮤직 플레이리스트와 플레이어를 구현한 개인 사이드 프로젝트 웹앱입니다
 ### Play List 
 - 전체 반복 재생 & 랜덤 재생 설정이 가능합니다
 - 로그인된 유저는 자신만의 플레이리스트를 가질 수 있습니다
 - 곡 중복 추가와 삭제가 가능합니다

 ### Player
 - 이전곡 & 다음곡 재생이 가능합니다
 - 노래를 찜(하트)할 수 있습니다.
 - 음량을 조절할 수 있으며 원하는 부분으로 건너뛰기 가능합니
 
 ### 인기 차트
 - 노래가 재생되면(=플레이리스트에 담겨지면) 해당 노래 재생수가 업데이트 됩니다
 - 누적 재생 수를 기반으로 한 순위 차트를 확인할 수 있습니다
  
 ### 로그인 & 회원가입
 - 아이디, 비밀번호, 닉네임 정보로 회원가입이 가능합니다
 - 비밀번호는 bcrypt 라이브러리를 사용하여 암호(해시)화되어 저장됩니다 
 - 아이디는 이미 존재하는 아이디와 중복될 수 없습니다
 
 ### 마이페이지
  - 유저 프로필 이미지와 닉네임 수정이 가능합니다
  - 찜(하트) 누른 곡을 확인할 수 있습니다
 
 ### 뮤직비디오
  - youtube api를 이용하였습니다
  - db에 등록된 뮤직비디오를 감상할 수 있습니다
  - 모달 형태로 구현하였습니다
  
 ### 반응형 페이지
  - 데스크탑, 모바일 등 기기별로 다른 레이아웃을 적용하였습니다
 
<br/>

## 📀 Demo

|PLAYER|PLAYLIST|
|:---:|:---:|
| <img width="450px" height="248px" src="https://user-images.githubusercontent.com/101038390/236477042-d4fd5980-5bdc-4065-8ecb-4fb4f40e0281.gif" />|<img width="450px" height="248px" src="https://user-images.githubusercontent.com/101038390/236475039-2933098a-1ba4-4acc-a1cb-e5d2fd97f44c.gif"  />|

|로그인|마이페이지|
|:---:|:---:|
| <img width="450px" height="248px" src="https://user-images.githubusercontent.com/101038390/236474390-a93e72e2-4b84-445d-ad16-13ef974b5b76.gif"  />|  <img width="450px" height="248px" src="https://user-images.githubusercontent.com/101038390/236475292-e6d3f941-e317-4fc6-b433-8820a6cb3b47.gif"  />|

|차트|뮤직비디오|
|:---:|:---:|
| <img width="450px" height="248px" src="https://user-images.githubusercontent.com/101038390/236474408-955459cd-2759-4e5e-ab85-9488d84eba1c.gif"/> | <img width="450px" height="248px" src="https://user-images.githubusercontent.com/101038390/236477035-ab5aaab4-3e73-4ea2-a676-b1960450b7c0.gif"  />|


## 💻Tech Stack
### Back-end

<img  src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

### Front-end
<img src="https://img.shields.io/badge/pug-A86454?style=for-the-badge&logo=pug&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 



## 📂파일 구조
```
📦src
 ┣ 📂client
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📜api.js
 ┃ ┃ ┣ 📜header.js
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┣ 📜mv.js
 ┃ ┃ ┗ 📜mypage.js
 ┃ ┣ 📂scss
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜player.scss
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┣ 📜_reset.scss
 ┃ ┃ ┃ ┗ 📜_variables.scss
 ┃ ┃ ┣ 📂img
 ┃ ┃ ┃ ┣ 📂Profile
 ┃ ┃ ┃ ┣ 📜favicon-32x32.png
 ┃ ┃ ┃ ┣ 📜LEMON-logo.png
 ┃ ┃ ┃ ┣ 📜lemon.png
 ┃ ┃ ┃ ┗ 📜nosong.png
 ┃ ┃ ┣ 📂screens
 ┃ ┃ ┃ ┣ 📜chart.scss
 ┃ ┃ ┃ ┣ 📜fullchart.scss
 ┃ ┃ ┃ ┣ 📜login.scss
 ┃ ┃ ┃ ┣ 📜musicvideo.scss
 ┃ ┃ ┃ ┗ 📜mypage.scss
 ┃ ┃ ┗ 📜main.scss
 ┃ ┗ 📂source
 ┃ ┃ ┣ 📜awaken-136824.mp3
 ┃ ┃ ┣ 📜beautiful-trip.mp3
 ┃ ┃ ┣ 📜business-time.mp3
 ┃ ┃ ┣ 📜cinematic-documentary-piano.mp3
 ┃ ┃ ┣ 📜dark-mystery-trailer-taking-our-time.mp3
 ┃ ┃ ┣ 📜for-you.mp3
 ┃ ┃ ┣ 📜inspiring-dream.mp3
 ┃ ┃ ┣ 📜lifelike.mp3
 ┃ ┃ ┣ 📜mirai.mp3
 ┃ ┃ ┣ 📜playful.mp3
 ┃ ┃ ┗ 📜stomps-and-claps-percussion-and-rhythm.mp3
 ┣ 📂controllers
 ┃ ┣ 📜loginController.js
 ┃ ┗ 📜songController.js
 ┣ 📂models
 ┃ ┣ 📂data
 ┃ ┃ ┣ 📜MV.json
 ┃ ┃ ┣ 📜Song.json
 ┃ ┃ ┗ 📜User.json
 ┃ ┣ 📜MV.js
 ┃ ┣ 📜Song.js
 ┃ ┗ 📜User.js
 ┣ 📂routers
 ┃ ┣ 📜chartRouter.js
 ┃ ┗ 📜rootRouter.js
 ┣ 📂views
 ┃ ┣ 📂partials
 ┃ ┃ ┣ 📜footer.pug
 ┃ ┃ ┣ 📜fullchart.pug
 ┃ ┃ ┣ 📜header.pug
 ┃ ┃ ┣ 📜musicvideo.pug
 ┃ ┃ ┣ 📜newest.pug
 ┃ ┃ ┣ 📜player.pug
 ┃ ┃ ┗ 📜playlist.pug
 ┃ ┣ 📜base.pug
 ┃ ┣ 📜home.pug
 ┃ ┣ 📜login.pug
 ┃ ┣ 📜mypage.pug
 ┃ ┗ 📜signup.pug
 ┣ 📜android-icon-36x36.png
 ┣ 📜db.js
 ┣ 📜favicon.ico
 ┣ 📜init.js
 ┣ 📜middlewares.js
 ┗ 📜server.js
```
## 🎶소스
- [Pixabay](https://pixabay.com/ko/music/)
