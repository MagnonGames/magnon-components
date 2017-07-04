import MagnonElement from "../../src/magnon-element.js";

import html from "./logo.content.js";
import css from "./logo.style.js";

export class MagnonLogo extends MagnonElement {
    constructor() {
        super({ content: html + css });
    }

    static get elementName() {
        return "magnon-logo";
    }

    contentReady() {
        this._icon = this.root.querySelector("#icon");
        this._text = this.root.querySelector("#text");

        this._iconPaths = this._icon.querySelectorAll("path");
        this._textPaths = this._text.querySelectorAll("path");

        this._animating = false;
    }

    get animating() {
        return this._animating;
    }

    connectedCallback() {
        if (this.hasAttribute("animate")) {
            this.animateIn();
        }
    }

    animateIn(callback) {
        this._animate("in", callback);
    }

    animateOut(callback) {
        this._animate("out", callback);
    }

    _animate(direction, callback) {
        this._animating = true;
        const animatingIn = direction === "in";

        /* Text Animation */
        this._textPaths.forEach((path, i) => {
            path.style.transition = "none";

            const strokeLength = path.getTotalLength();
            path.style.strokeDasharray = strokeLength;
            path.style.strokeDashoffset = animatingIn ? strokeLength : 0;

            setTimeout(() => {
                path.style.transition = "";
                path.style.strokeDashoffset = animatingIn ? 0 : strokeLength;

                if (i === this._textPaths.length - 1) {
                    this._animating = false;
                    if (typeof callback === "function") {
                        path.addEventListener("transitionend", () => callback());
                    }
                }
            }, i * 50 + 50);
        });

        /* Icon Aniamtion */
        const rotationAmount = "80deg";

        this._icon.style.transition = "none";
        this._icon.style.transform = animatingIn
            ? `rotate(${rotationAmount})` : "rotate(0)";

        setTimeout(() => {
            this._icon.style.transition = "";
            this._icon.style.transform = animatingIn
                ? "rotate(0)" : `rotate(-${rotationAmount})`;
        }, 50);

        for (let i = 0; i < this._iconPaths.length; i++) {
            const path = this._iconPaths[
                animatingIn ? i : -(i - this._iconPaths.length) - 1
            ];

            path.style.transition = "none";
            path.style.opacity = animatingIn ? 0 : 1;

            setTimeout(() => {
                path.style.transition = "";
                path.style.opacity = animatingIn ? 1 : 0;
            }, i * 200 + 50);
        }
    }
}

MagnonLogo.init();
