export default class Pellet {
  constructor(canvas, context, isPower = false) {
    this.canvas = canvas;
    this.context = context;
    this.isPower = isPower;
  }

  canvas;
  context;
  isPower;
}
