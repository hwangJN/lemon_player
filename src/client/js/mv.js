import { pauseMusic } from "./main";

if (window.location.pathname === "/") {
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
}
