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
    }

    static get name() {
        return "magnon-card";
    }

    static get propertyAttributes() {
        return {
            number: ["shadow"]
        };
    }

    propertySet(property, old, value) {
        if (property === "shadow") {
            const clamped = Math.min(3, Math.max(0, value));

            this._card.style.boxShadow = `var(--magnon-shadow-${clamped})`;
        }
    }
}

MagnonCard.init();
