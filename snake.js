const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');
const box = 20;                     // 一格 20px
let snake, dir, food, game;

function init() {
  snake = [{x: 9*box, y: 9*box}];   // 初始 1 节
  dir   = null;
  food  = randFood();
  game  = setInterval(update, 120);
}
function randFood() {
  return {x: Math.floor(Math.random()*20)*box,
          y: Math.floor(Math.random()*20)*box};
}
function draw() {
  ctx.clearRect(0,0,cvs.width,cvs.height);
  // 画蛇
  ctx.fillStyle = '#0f0';
  snake.forEach(s => ctx.fillRect(s.x, s.y, box, box));
  // 画食物
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, box, box);
}
function update() {
  if (!dir) { draw(); return; }
  const head = {x: snake[0].x + dir.x*box,
                y: snake[0].y + dir.y*box};
  // 撞墙或撞自己
  if (head.x < 0 || head.x >= cvs.width ||
      head.y < 0 || head.y >= cvs.height ||
      snake.some(s => s.x === head.x && s.y === head.y))
    return gameOver();
  snake.unshift(head);
  // 吃到食物
  if (head.x === food.x && head.y === food.y) food = randFood();
  else snake.pop();
  draw();
}
function gameOver() {
  clearInterval(game);
  alert('Game Over! Refresh to restart.');
}
document.addEventListener('keydown', e => {
  const keyMap = {ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1},
                  ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0}};
  if (keyMap[e.key]) { dir = keyMap[e.key]; e.preventDefault(); }
});
init();
