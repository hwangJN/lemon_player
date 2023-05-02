import { PLview, myHEART, myPLAYLIST } from "./main";

if (window.location.pathname === "/") {
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
}
