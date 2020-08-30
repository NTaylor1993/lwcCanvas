export default class Maze {
  constructor(cvs, ctx, level) {
    this.cvs = cvs;
    this.ctx = ctx;
    // this.level = level;
  }

  cvs;
  ctx;

  level = "#################### ";

  wallThickness = 50;
  colour = "blue";

  draw = () => {
    const { level } = this;

    let startY = 0;
    let yThickness = this.wallThickness;
    let startX = 0;
    let xThickness = 0;
    for (let i = 0; i < level.length; i++) {
      if (level.charAt(i) === "#") {
        xThickness += this.wallThickness;
      } else {
        this.ctx.fillRect(startX, startY, xThickness, yThickness);
      }
    }
  };
}
