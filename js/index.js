const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");
myCanvas.style.border = "2px solid black";

const bgImg = new Image();
bgImg.src = "../images/road.png";
const bgImg2 = new Image();
bgImg2.src = "../images/road.png";
let bg1Y = 0;
let bg2Y = -myCanvas.height;

let car = new Image();
car.src = "../images/car.png";
let carHeight = 200;
let carWidth = 100;
let carX = myCanvas.width / 2;
let carY = myCanvas.height - 100;
let carSpeed = 25;

let obstacles = [];
let obstacleInterval = 2000; // milliseconds
let lastObstacleTime = 0;

let score = 0;
let gameOver = false;
let animateId;

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
      carX -= carSpeed;
  } else if (event.code === "ArrowRight") {
      carX += carSpeed;
  }
  carX = Math.max(0, Math.min(carX, myCanvas.width - carWidth));
});

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2, 0, bg1Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg, 0, bg2Y, myCanvas.width, myCanvas.height);
  bg1Y += 2;
  bg2Y += 2;

  if (bg1Y > myCanvas.height) {
    bg1Y = -myCanvas.height;
  }

  if (bg2Y > myCanvas.height) {
    bg2Y = -myCanvas.height;
  }

  ctx.drawImage(car, carX, carY, carWidth, carHeight);

  let currentTime = Date.now();
  if (currentTime - lastObstacleTime > obstacleInterval) {
    lastObstacleTime = currentTime;
    obstacles.push({
      x: Math.random() * myCanvas.width,
      y: -50,
    });
  }

  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    ctx.fillRect(obstacle.x, obstacle.y, 100, 50);
    obstacle.y += 2;

    if (
      obstacle.x < carX + carWidth &&
      obstacle.x + 100 > carX &&
      obstacle.y < carY + carHeight &&
      obstacle.y + 50 > carY
    ) {
      gameOver = true;
      cancelAnimationFrame(animateId);
      alert("Game Over!  Your score is: " + score);
    } else if (obstacle.y > myCanvas.height) {
      obstacles.splice(i, 1);
      score++;
    }
  }

   if (!gameOver) {
    ctx.fillStyle = "Black";
    ctx.font = "25px Arial Black";
    ctx.fillText("Score: " + score, 40, 50);
    animateId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animateId);
    alert("Game Over! Your final score is: " + score);
  }
}

function startGame() {
  animate();
}
