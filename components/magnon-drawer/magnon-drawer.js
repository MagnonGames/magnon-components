import MagnonElement from "../../src/magnon-element.js";

import html from "./drawer.content.js";
import css from "./drawer.style.js";

import "../magnon-styles/magnon-styles.js";

export class MagnonDrawer extends MagnonElement {
    constructor() {
        super({ content: html + css });
    }

    static get elementName() {
        return "magnon-drawer";
    }

    static get propertyAttributes() {
        return {
            bool: ["open"]
        };
    }

    contentReady() {
        this._container = this.root.querySelector("#container");
        this._blackout = this.root.querySelector("#blackout");

        this._closeCallback = () => (this.open = false);
        this._blackout.addEventListener("click", this._closeCallback);
    }

    disconnectedCallback() {
        if (!this._closeCallback) return;
        this._blackout.removeEventListener("click", this._closeCallback);
    }

    propertySet(property, old, value) {
        if (property === "open") {
            this._setOpen(value);
        }
    }

    _setOpen(isOpen) {
        if (this._lastOpen === isOpen) return;
        this._lastOpen = isOpen;

        if (isOpen) {
            this._container.style.left = "0px";
            this._blackout.style.opacity = "0.8";
            this._blackout.style.pointerEvents = "all";
        } else {
            this._container.style.left = "-300px";
            this._blackout.style.opacity = "0";
            this._blackout.style.pointerEvents = "none";
        }
    }
}

MagnonDrawer.init();
