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
- Node, MongoDB 관련 개발 경험을 쌓기

## 📀 프로젝트 소개 & 기능
- 뮤직 플레이리스트 & 플레이어 구현 웹사이트입니다
- 로그인된 유저는 자신만의 플레이리스트를 가질 수 있습니다
- 전체 반복 재생 & 랜덤 재생이 가능합니다
- 재생 수를 기반으로 한 순위 차트를 확인할 수 있습니다
- 유저 프로필 수정이 가능합니다
- 등록된 뮤직비디오를 감상할 수 있습니다
- 반응형 웹페이지로 제작하였습니다

## 📀 Demo

|PLAY|PLAYLIST|
|:---:|:---:|
|테스트1|테스트2|

|로그인|마이페이지|
|:---:|:---:|
|테스트1|테스트2|

|차트|마이페이지|
|:---:|:---:|
|테스트1|테스트2|


## 💻Tech Stack
### Back-end

<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

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
