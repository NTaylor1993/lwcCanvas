/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from "lwc";

import Maze from "./gameElements/maze";
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

  pacman;
  maze;
  ghosts = [];
  pellets = [];

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

      this.pacman = new Pacman(this.cvs, this.ctx);
      this.maze = new Maze(this.cvs, this.ctx);
      for (let i = 0; i < 4; i++) {
        this.ghosts.push(new Ghost(this.cvs, this.ctx, "Pinky"));
      }
    }
  }

  clearContext() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  }

  async renderCycle() {
    this.clearContext();
    this.pacman.draw();

    this.ghosts.forEach((ghost) => {
      ghost.draw();
    });

    setTimeout(() => {
      this.renderCycle();
    }, (1 / this.frameRate) * 1000);
  }
}
