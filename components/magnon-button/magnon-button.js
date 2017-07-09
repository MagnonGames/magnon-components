import MagnonElement from "../../src/magnon-element.js";
import { html } from "../../src/literals.js";

import css from "./button.style.js";

export class MagnonButton extends MagnonElement {
    constructor() {
        super({ content: html`<button><div><slot></slot></div></button>` + css });
    }

    static get elementName() {
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
