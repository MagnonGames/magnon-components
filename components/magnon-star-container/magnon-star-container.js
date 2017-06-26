import MagnonElement from "../../src/magnon-element.js";

import css from "./star-container.style.js";

const stars = 200;
const starSpeed = 0.0005;
const starSize = 2.5;
const reactionDistance = 0.3;

export class MagnonStarContainer extends MagnonElement {
    constructor() {
        super({ content: `
            <canvas></canvas>
            <div id="content"><slot></slot></div>
            ${css}
        ` });
    }

    static get name() {
        return "magnon-star-container";
    }

    static get propertyAttributes() {
        return {
            bool: ["parallax"]
        };
    }

    contentReady() {
        this._canvas = this.root.querySelector("canvas");
        this._ctx = this._canvas.getContext("2d");

        this._stars = [];
        for (let i = 0; i < stars; i++) {
            this._stars[i] = new Star(Math.random());
            this._stars[i].randomYZ();
        }

        this.mouseX = this.mouseY = 0;
        this.width = this.height = 0;

        window.addEventListener("mousemove", e => {
            const { top, left } = this._canvas.getBoundingClientRect();
            this.mouseX = (e.clientX - left) / this.width;
            this.mouseY = (e.clientY - top) / this.height;
        });

        this._animate();
    }

    _animate() {
        const ctx = this._ctx;
        const ratio = window.devicePixelRatio;
        const { width: realWidth, height: realHeight, top } = this._canvas.getBoundingClientRect();
        this.width = realWidth * ratio;
        this.height = realHeight * ratio;

        this._canvas.width = this.width;
        this._canvas.height = this.height;

        const mouseYoff = this.parallax ? top / this.height : 0;
        const drawYoff = this.parallax ? -top : 0;

        ctx.clearRect(0, 0, this.width, this.height);

        this._stars.forEach(s => {
            s.update(this.mouseX, this.mouseY + mouseYoff, this.width, this.height);
            s.draw(ctx, this.width, this.height, drawYoff);
        });

        requestAnimationFrame(() => this._animate());
    }
}

class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.sizeMultiplier = 1;

        this.color = [60, 250, 166, 0];
    }

    randomYZ() {
        this.y = Math.random();
        this.z = Math.random() + 0.1;
    }

    update(mx, my, w, h) {
        if (this.color[3] < 1) this.color[3] += 0.01;

        const a = this.x - mx;
        const b = this.y - my;
        const distanceToMouse = Math.sqrt(a * a + b * b);

        if (distanceToMouse < reactionDistance) {
            const newColor = [61, 250, 166];
            const value = (-distanceToMouse + reactionDistance) / reactionDistance;

            for (let i = 0; i < 3; i++) {
                this.color[i] = Math.round(255 - value * (255 - newColor[i]));
            }

            this.sizeMultiplier = 1 + value * 2;
        } else {
            for (let i = 0; i < 3; i++) this.color[i] = 255;
            this.sizeMultiplier = 1;
        }

        this.x -= starSpeed * this.z;
        if (this.x < -starSize / w) {
            this.x = 1 + starSize / w;
            this.velX = this.velY = 0;
            this.randomYZ();
        }
    }

    draw(ctx, w, h, yoff) {
        const drawSize = starSize * this.z * this.sizeMultiplier;
        const halfSize = drawSize / 2;

        const colorString = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`;
        const x = this.x * w - halfSize;
        const y = this.y * h - halfSize + yoff;

        ctx.fillStyle = colorString;
        ctx.fillRect(x, y, drawSize, drawSize);
    }
}

MagnonStarContainer.init();
