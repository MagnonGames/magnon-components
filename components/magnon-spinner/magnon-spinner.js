import MagnonElement from "../../src/magnon-element.js";
import { css } from "../../src/literals.js";

import "../magnon-styles/magnon-styles.js";

const style = css`
:host {
    display: inline-block;
    position: relative;
    width: var(--magnon-spinner-size, 32px);
    height: var(--magnon-spinner-size, 32px);
}

.ball {
    display: block;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: auto;
    background: var(--magnon-spinner-color, var(--magnon-black));
    border-radius: 50%;
    width: calc(var(--magnon-spinner-size, 32px) / 3);
    height: calc(var(--magnon-spinner-size, 32px) / 3);
    transform-origin: center;
}
`;

const pi2 = Math.PI * 2;

export class MagnonSpinner extends MagnonElement {
    constructor(options = {
        balls: 3, ballScale: 1, ballOffset: 1 / 3, spinSpeed: 3,
        minRadius: 0, maxRadius: 100
    }) {
        super({ content: `<div id="container"></div>` + style });

        this._balls = [];

        this._initOptions = options;

        this._timer = 0;
        requestAnimationFrame(() => this._animate());
    }

    static get elementName() {
        return "magnon-spinner";
    }

    static get propertyAttributes() {
        return {
            bool: ["alternate"],
            number: [
                "balls", "ball-scale", "ball-offset",
                "spin-speed", "min-radius", "max-radius"
            ]
        };
    }

    connectedCallback() {
        const options = this._initOptions;

        this.balls = options.balls;
        this.ballScale = options.ballScale;
        this.ballOffset = options.ballOffset;
        this.alternate = options.alternate;

        this.spinSpeed = options.spinSpeed;
        this.minRadius = options.minRadius;
        this.maxRadius = options.maxRadius;
    }

    propertySet(property, old, value) {
        if (property === "balls") {
            const container = this.root.querySelector("#container");

            let child = container.firstChild;
            while (child) {
                container.removeChild(child);
                child = container.firstChild;
            }
            this._balls = [];

            for (let i = 0; i < value; i++) {
                const ball = document.createElement("span");
                ball.className = "ball";
                container.appendChild(ball);
                this._balls[i] = ball;
            }
        }
    }

    _animate() {
        this._timer += 0.05;
        if (this._timer >= pi2) this._timer -= pi2;

        const radiusMin = parseInt(this.minRadius);
        const radiusMax = parseInt(this.maxRadius);
        const radiusTotal = radiusMax - radiusMin;

        this._balls.forEach((ball, i) => {
            const rotation = pi2 * this.ballOffset * i + this._timer * this.spinSpeed;
            const fromMiddle = (Math.sin(this._timer / 2) * radiusTotal) + radiusMin;

            ball.style.transform = `
                rotate(${rotation}rad)
                translate(${fromMiddle}%)
                scale(${this.ballScale})
            `;
        });

        requestAnimationFrame(() => this._animate());
    }
}

MagnonSpinner.init();
