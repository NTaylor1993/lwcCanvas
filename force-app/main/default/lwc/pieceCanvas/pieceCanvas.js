/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from "lwc";
import GamePiece from "./piece";

export default class PieceCanvas extends LightningElement {
  canvas;
  context;

  selectedPiece = "0";
  gamePieces = [];

  frameRate = 60;

  colourOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "black", label: "Black" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" }
  ];
  colourValue = "red";

  pieceOptions = [];

  renderedCallback() {
    if (!this.canvas) {
      this.setup();
      this.renderCycle();
    }
  }

  async renderCycle() {
    this.clearContext();
    if (this.gamePieces) {
      let that = this;
      this.gamePieces.forEach((piece) => {
        piece.newPos(that.canvas);
        piece.update(that.context);
      });
    }
    setTimeout(() => {
      this.renderCycle();
    }, (1 / this.frameRate) * 1000);
  }

  setup() {
    this.canvas = this.template.querySelector("canvas");
    if (this.canvas) {
      this.context = this.canvas.getContext("2d");
      this.clearContext();
      this.createNewGamePiece("Square");
    }
  }

  clearContext() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createNewGamePiece(shape) {
    const pieceIndex = `${shape} ${this.gamePieces.length + 1}`;
    this.gamePieces.push(
      new GamePiece(
        pieceIndex,
        this.context,
        this.canvas,
        shape,
        this.colourValue
      )
    );

    const tempList = [];
    for (let i = 0; i < this.gamePieces.length; i++) {
      tempList.push({
        value: i.toString(),
        label: this.gamePieces[i].index
      });
    }
    this.pieceOptions = [...tempList];
  }

  handleFrameRateChange(event) {
    this.frameRate = event.target.value;
  }

  handleNewSquareClick() {
    this.createNewGamePiece("Square");
  }

  handleNewCircleClick() {
    this.createNewGamePiece("Circle");
  }

  handleNewPacmanClick() {
    this.createNewGamePiece("Pacman");
  }

  handleColourChange(event) {
    this.colourValue = event.target.value;
  }

  handleSelectedPieceChange(event) {
    this.selectedPiece = event.target.value;
  }

  handleUp() {
    this.gamePieces[parseInt(this.selectedPiece, 10)].speedY -= 1;
  }

  handleDown() {
    this.gamePieces[parseInt(this.selectedPiece, 10)].speedY += 1;
  }
  handleLeft() {
    this.gamePieces[parseInt(this.selectedPiece, 10)].speedX -= 1;
  }
  handleRight() {
    this.gamePieces[parseInt(this.selectedPiece, 10)].speedX += 1;
  }
}
