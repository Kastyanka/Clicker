const $circle = document.querySelector("#circle");
const $score = document.querySelector("#score");
const $restart = document.querySelector("#restart");

function resetGame() {
  setScore(0);
  setImage();
}

$restart.addEventListener("click", resetGame);

function start() {
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem("score", score);
  $score.textContent = score;
}

function setImage() {
  const score = getScore();

  if (score >= 189) {
    $circle.setAttribute("src", "./assets/10pic.jpeg");
  } else if (score >= 162) {
    $circle.setAttribute("src", "./assets/9pic.jpeg");
  } else if (score >= 141) {
    $circle.setAttribute("src", "./assets/8pic.jpeg");
  } else if (score >= 116) {
    $circle.setAttribute("src", "./assets/7pic.jpeg");
  } else if (score >= 90) {
    $circle.setAttribute("src", "./assets/6pic.jpeg");
  } else if (score >= 75) {
    $circle.setAttribute("src", "./assets/5pic.jpeg");
  } else if (score >= 56) {
    $circle.setAttribute("src", "./assets/4pic.jpeg");
  } else if (score >= 43) {
    $circle.setAttribute("src", "./assets/3pic.jpeg");
  } else if (score >= 21) {
    $circle.setAttribute("src", "./assets/2pic.jpeg");
  } else {
    $circle.setAttribute("src", "./assets/1pic.jpeg");
  }
}

function getScore() {
  const score = Number(localStorage.getItem("score"));
  return isNaN(score) ? 0 : score;
}

function addOne() {
  setScore(getScore() + 1);
  setImage();
}

$circle.addEventListener("click", (event) => {
  const rect = $circle.getBoundingClientRect();

  const offfsetX = event.clientX - rect.left - rect.width / 2;
  const offfsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 70;

  const tiltX = (offfsetY / rect.height) * DEG;
  const tiltY = (offfsetX / rect.width) * -DEG;

  $circle.style.setProperty("--tiltX", `${tiltX}deg`);
  $circle.style.setProperty("--tiltY", `${tiltY}deg`);

  setTimeout(() => {
    $circle.style.setProperty("--tiltX", `0deg`);
    $circle.style.setProperty("--tiltY", `0deg`);
  }, 300);

  const plusOne = document.createElement("div");
  plusOne.classList.add("plus-one");
  plusOne.textContent = "+1";
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;

  $circle.parentElement.appendChild(plusOne);

  addOne();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);
});

start();
