import MagnonElement from "../../src/magnon-element.js";

import { html, css } from "../../src/literals.js";

import "../magnon-icon-button/magnon-icon-button.js";

const content = html`
<a target="_blank">
    <magnon-icon-button tabindex="-1" id="button"></magnon-icon-button>
</a>
`;

const style = css`
:host {
    display: block;
}

a {
    outline-color: var(--magnon-outline-color);
}
`;

export class MagnonSocialButton extends MagnonElement {
    constructor() {
        super({ content: content + style });
    }

    static get elementName() {
        return "magnon-social-button";
    }

    static get propertyAttributes() {
        return {
            string: ["icon", "href", "user", "title"]
        };
    }

    contentReady() {
        this._a = this.root.querySelector("a");
        this._button = this.root.querySelector("#button");
    }

    propertySet(property, old, value) {
        if (property === "icon") {
            this._button.setAttribute("icon", value);
        } else if (property === "href") {
            this._a.setAttribute("href", value);
        } else if (property === "user") {
            // TODO: Name display
        } else if (property === "title") {
            this._a.setAttribute("title", value);
        }
    }
}

MagnonSocialButton.init();
