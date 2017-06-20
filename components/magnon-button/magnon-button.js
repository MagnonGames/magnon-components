import MagnonElement from "../../src/magnon-element.js";

import css from "./button.style.js";

export class MagnonButton extends MagnonElement {
    constructor() {
        super({ content: `<button><slot></slot></button>${css}` });
    }

    static get name() {
        return "magnon-button";
    }

    contentReady() {
        this._button = this.root.querySelector("button");
        this._generateLabel();
    }

    _generateLabel() {
        const label = this.textContent.trim();
        this._button.setAttribute("aria-label", label);
    }
}

MagnonButton.init();
