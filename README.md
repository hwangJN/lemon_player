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
 2. 랜덤재생 오류 수정
 3. modal 스크롤 방지 수정
 4. mongodb 업데이트 관련 버그 해결
 5. 곡 추가/삭제 리팩토링
 
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
