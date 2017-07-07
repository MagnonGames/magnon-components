import MagnonElement from "../../src/magnon-element.js";

import html from "./card.content.js";
import css from "./card.style.js";

import "../magnon-styles/magnon-styles.js";

export class MagnonCard extends MagnonElement {
    constructor() {
        super({ content: html + css });
    }

    contentReady() {
        this._card = this.root.querySelector("#card");
        this._header = this.root.querySelector("#header");

        window.addEventListener("resize", () => this._onResize());
        this._onResize();
    }

    static get elementName() {
        return "magnon-card";
    }

    static get propertyAttributes() {
        return {
            string: ["header-image"],
            number: ["shadow"]
        };
    }

    propertySet(property, old, value) {
        if (property === "shadow") {
            const clamped = Math.min(3, Math.max(0, value));

            this._card.style.boxShadow = `var(--magnon-shadow-${clamped})`;
        } else if (property === "header-image") {
            if (value) {
                this._header.style.display = "block";
                this._header.style.backgroundImage = `url(${value})`;
            } else {
                this._header.style.display = "hidden";
            }
        }
    }

    _onResize() {
        if (this.offsetWidth < 580) this._card.classList.remove("wide");
        else this._card.classList.add("wide");
    }
}

MagnonCard.init();
