import MagnonElement from "../../src/magnon-element.js";

import html from "./footer.content.js";
import css from "./footer.style.js";

import "../magnon-styles/magnon-styles.js";
import "../magnon-social-buttons/magnon-social-buttons.js";

export class MagnonFooter extends MagnonElement {
    constructor() {
        super({ content: html + css });
    }

    static get name() {
        return "magnon-footer";
    }
}

MagnonFooter.init();
