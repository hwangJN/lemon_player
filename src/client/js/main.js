import "../scss/main.scss";

// Define the event handler function
function handleClick(songElem) {
  const songId = songElem.dataset.songId;
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Song clicks updated:", data);
      songElem.querySelector("[data-clicks]").textContent = data.meta.play;
    })
    .catch((error) => console.error(error));
}
