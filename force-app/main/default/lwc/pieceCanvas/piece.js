export default class Piece {
  constructor(index, ctx, canvas, shape = "Square", colour = "red") {
    this.index = index;
    this.ctx = ctx;
    this.canvas = canvas;
    this.shape = shape;
    this.colour = colour;
  }

  index;
  shape;
  ctx;
  canvas;
  waka = false;
  wakaCounter = 0;
  pacRadius = 20;
  width = 30;
  height = 30;
  x = 10;
  y = 120;
  speedX = 0;
  speedY = 0;
  colour;
  update = () => {
    this.ctx.fillStyle = this.colour;
    switch (this.shape) {
      case "Square":
        this.drawSquare();
        break;
      case "Circle":
        this.drawCircle(this.ctx);
        break;
      case "Pacman":
        this.drawPacMan(this.ctx);
        break;
      default:
        break;
    }
  };
  newPos = () => {
    //Bounce
    if (this.canvas) {
      if (this.x < -30) {
        this.x = this.canvas.width + 30;
      } else if (this.x > this.canvas.width + 30) {
        this.x = -30;
      }
      if (this.y < -30) {
        this.y = this.canvas.height - 30;
      } else if (this.y > this.canvas.height + 30) {
        this.y = -30;
      }
    }
    this.x += this.speedX;
    this.y += this.speedY;
  };

  drawSquare() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawPacMan() {
    this.ctx.beginPath();
    if (!this.waka) {
      this.ctx.arc(
        this.x,
        this.y,
        this.pacRadius,
        0.25 * Math.PI,
        1.25 * Math.PI,
        false
      );
    } else {
      this.ctx.arc(
        this.x,
        this.y,
        this.pacRadius,
        0.01 * Math.PI,
        1.25 * Math.PI,
        false
      );
    }
    this.ctx.fillStyle = "rgb(255, 255, 0)";
    this.ctx.fill();
    this.ctx.beginPath();
    if (!this.waka) {
      this.ctx.arc(
        this.x,
        this.y,
        this.pacRadius,
        0.75 * Math.PI,
        1.75 * Math.PI,
        false
      );
    } else {
      this.ctx.arc(
        this.x,
        this.y,
        this.pacRadius,
        0.75 * Math.PI,
        1.99 * Math.PI,
        false
      );
    }
    this.ctx.fill();
    this.ctx.beginPath();
    if (!this.waka) {
      this.ctx.arc(
        this.x,
        this.y - this.pacRadius / 2,
        2,
        0,
        2 * Math.PI,
        false
      );
    } else {
      this.ctx.arc(
        this.x + this.pacRadius / 4,
        this.y - this.pacRadius / 3,
        2,
        0,
        2 * Math.PI,
        false
      );
    }
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fill();
    this.wakaCounter += 1;
    if (this.wakaCounter >= 15) {
      this.waka = !this.waka;
      this.wakaCounter = 0;
    }
  }
}
