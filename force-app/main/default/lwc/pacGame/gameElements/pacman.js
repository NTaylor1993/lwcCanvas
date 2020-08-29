export default class Pacman {
  constructor(cvs, ctx) {
    this.cvs = cvs;
    this.ctx = ctx;
  }

  cvs;
  ctx;

  x = 50;
  y = 50;
  pacRadius = 15;

  waka = false;
  wakaCounter = 0;

  draw = () => {
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
  };
}
