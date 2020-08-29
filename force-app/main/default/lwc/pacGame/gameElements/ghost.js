const GHOST_DETAILS = {
  Pinky: { colour: "pink" },
  Inky: { colour: "cyan" },
  Blinky: { colour: "red" },
  Clyde: { colour: "orange" }
};

export default class Ghost {
  constructor(cvs, ctx, name, startX, startY) {
    this.cvs = cvs;
    this.ctx = ctx;
    this.name = name;

    this.x = startX;
    this.y = startY;
  }

  cvs;
  ctx;

  x;
  y;
  height = 12;
  width = 10;

  name;
  scared;

  get bodyCol() {
    return GHOST_DETAILS[this.name].colour;
  }

  borderCol = () => {
    return "white";
  };

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.scared ? "blue" : this.bodyCol;
    this.ctx.arc(this.x, this.y, this.width, Math.PI, 2 * Math.PI);
    this.ctx.lineTo(this.x + this.width, this.y + this.height);
    this.ctx.arc(
      this.x + this.width / 2,
      this.y + this.height,
      this.width * 0.5,
      0,
      Math.PI
    );
    this.ctx.arc(
      this.x + this.width / 2 - this.width,
      this.y + this.height,
      this.width * 0.5,
      0,
      Math.PI
    );
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = this.borderCol;
    this.ctx.stroke();
  }
}
