/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from "lwc";

import Pacman from "./gameElements/pacman";
import Ghost from "./gameElements/ghost";
import Pellet from "./gameElements/pellet";
import Maze from "./gameElements/maze";

export default class PacGame extends LightningElement {
  canvasConfig = {
    height: 1000,
    width: 800,
    style: "background: rgb(0, 0, 0)"
  };

  cvs;
  ctx;
  frameRate = 60;

  renderedCallback() {
    if (!this.cvs) {
      this.setup();
      this.renderCycle();
    }
  }

  setup() {
    this.cvs = this.template.querySelector("canvas");
    if (this.cvs) {
      this.ctx = this.cvs.getContext("2d");
      this.clearContext();
    }
  }

  clearContext() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  }

  async renderCycle() {
    this.clearContext();

    setTimeout(() => {
      this.renderCycle();
    }, (1 / this.frameRate) * 1000);
  }
}
