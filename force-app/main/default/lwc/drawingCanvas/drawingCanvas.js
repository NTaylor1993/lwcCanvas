import { LightningElement, track } from "lwc";

let isDotFlag = false,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0;

let canvasElement;
let ctx;

export default class DrawingCanvas extends LightningElement {
  @track isDownFlag;

  rVal = "00";
  gVal = "00";
  bVal = "A0";

  lineWidth = 1.5;

  coords;

  connectedCallback() {
    this.template.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.template.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    this.template.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.template.addEventListener("mouseout", this.handleMouseOut.bind(this));
    this.template.addEventListener(
      "touchstart",
      this.handleTouchDown.bind(this)
    );
    this.template.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this)
    );
    this.template.addEventListener("touchend", this.handleTouchUp.bind(this));
    this.template.addEventListener(
      "touchcancel",
      this.handleTouchOut.bind(this)
    );
  }

  renderedCallback() {
    canvasElement = this.template.querySelector("canvas");
    ctx = canvasElement.getContext("2d");
  }

  //handler for mouse move operation
  handleMouseMove(event) {
    this.searchCoordinatesForEvent("move", event);
  }

  //handler for mouse down operation
  handleMouseDown(event) {
    const clientRect = canvasElement.getBoundingClientRect();

    if (this.isClickInBoundingBox(event.clientX, event.clientY, clientRect)) {
      this.searchCoordinatesForEvent("down", event);
    }
  }

  //handler for mouse up operation
  handleMouseUp(event) {
    this.searchCoordinatesForEvent("up", event);
  }

  //handler for mouse out operation
  handleMouseOut(event) {
    this.searchCoordinatesForEvent("out", event);
  }

  //handler for mouse out operation
  handleTouchDown(event) {
    this.searchCoordinatesForEvent("tDown", event);
  }
  //handler for mouse out operation
  handleTouchMove(event) {
    this.searchCoordinatesForEvent("tMove", event);
  }
  //handler for mouse out operation
  handleTouchUp(event) {
    this.searchCoordinatesForEvent("tUp", event);
  }
  //handler for mouse out operation
  handleTouchOut(event) {
    this.searchCoordinatesForEvent("tOut", event);
  }

  handleClearClick() {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }

  handleRChange(event) {
    this.rVal = event.target.value;
  }
  handleGChange(event) {
    this.gVal = event.target.value;
  }
  handleBChange(event) {
    this.bVal = event.target.value;
  }
  handleLineWidthChange(event) {
    this.lineWidth = event.target.value;
  }

  searchCoordinatesForEvent(requestedEvent, event) {
    event.preventDefault();
    event.stopPropagation();
    if (requestedEvent === "down" || requestedEvent === "tDown") {
      this.setupCoordinate(event);
      this.isDownFlag = true;
      isDotFlag = true;
      if (isDotFlag) {
        this.drawDot();
        isDotFlag = false;
      }
    }
    if (
      requestedEvent === "up" ||
      requestedEvent === "out" ||
      requestedEvent === "tUp" ||
      requestedEvent === "tOut"
    ) {
      this.isDownFlag = false;
    }
    if (requestedEvent === "move" || requestedEvent === "tMove") {
      if (this.isDownFlag) {
        this.setupCoordinate(event);
        this.redraw();
      }
    }
  }

  setupCoordinate(eventParam) {
    prevX = currX;
    prevY = currY;

    //Mobile
    //Need to get the value from the client rect and use touch event.
    if (eventParam.changedTouches) {
      const touchEvent = eventParam.changedTouches[0];

      currX = touchEvent.clientX - canvasElement.getBoundingClientRect().left;
      currY = touchEvent.clientY - canvasElement.getBoundingClientRect().top;
    } else {
      //Desktop
      //get size of an element and its position relative to the viewport
      //using getBoundingClientRect which returns left, top, right, bottom, x, y, width, height.
      const clientRect = canvasElement.getBoundingClientRect();

      currX = eventParam.clientX - clientRect.left;
      currY = eventParam.clientY - clientRect.top;
    }

    this.coords = `x: ${currX}, y: ${currY}`;
  }

  redraw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = `#${this.rVal}${this.gVal}${this.bVal}`; //sets the color, gradient and pattern of stroke
    ctx.lineWidth = this.lineWidth;
    ctx.closePath(); //create a path from current point to starting point
    ctx.stroke(); //draws the path
  }

  drawDot() {
    ctx.beginPath();
    ctx.fillStyle = x; //blue color
    ctx.fillRect(currX, currY, y, y); //fill rectrangle with coordinates
    ctx.closePath();
  }

  isClickInBoundingBox(clientX, clientY, clientRect) {
    return (
      clientX > clientRect.left &&
      clientX < clientRect.right &&
      clientY > clientRect.top &&
      clientY < clientRect.bottom
    );
  }
  get downFlag() {
    return this.isDownFlag;
  }
}
