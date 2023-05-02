// header On&Off
const menuBtn = document.querySelector(".header-btn");
const menuClose = document.querySelector(".header-wrap i");
const close = document.querySelector(".playlist-header .close");
export const header = document.querySelector(".header");
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
