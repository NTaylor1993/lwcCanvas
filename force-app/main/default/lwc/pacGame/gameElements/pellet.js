export default class Pellet {
  constructor(cvs, ctx, isPower = false) {
    this.cvs = cvs;
    this.ctx = ctx;
    this.isPower = isPower;
  }

  cvs;
  ctx;
  isPower;
}
