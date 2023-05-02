if (window.location.pathname === "/mypage") {
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
