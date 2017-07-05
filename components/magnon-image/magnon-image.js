import MagnonElement from "../../src/magnon-element.js";

import html from "./image.content.js";
import css from "./image.style.js";
import "./fullscreen-image.js";

import "../magnon-styles/magnon-styles.js";
import "../magnon-icon-button/magnon-icon-button.js";

let hasAppended = false;
let fullscreen;
let counter = 0;

export class MagnonImage extends MagnonElement {
    constructor() {
        super({ content: html + css });

        this._fullscreenEnabled = true;

        if (!hasAppended) appendToBody();
        hasAppended = true;
    }

    static get elementName() {
        return "magnon-image";
    }

    static get propertyAttributes() {
        return {
            bool: ["show-alt", "no-fullscreen", "disable-image-url"],
            string: ["src", "alt"]
        };
    }

    contentReady() {
        this._image = this.root.querySelector("#main-image");
        this._altText = this.root.querySelector("#alt-text");

        this._image.addEventListener("click", () => {
            if (!this.disableImageUrl && location.hash.startsWith("#mimg-")) return;

            if (!this._animating) {
                if (this.disableImageUrl) {
                    this.goFullscreen();
                } else {
                    location.hash = this.hash;
                }
            }
        });

        window.addEventListener("hashchange", () => this._checkHash());

        this.fullscreen = false;
    }

    get hasDescription() {
        return this.textContent.trim().length > 0;
    }

    get hash() {
        return `#mimg-${this._count}`;
    }

    get image() {
        return this._image;
    }

    get altText() {
        return this._altText;
    }

    connectedCallback() {
        this._count = counter++;

        this._checkHash();
    }

    propertySet(property, old, value) {
        if (property === "src") {
            this._image.src = value;
        } else if (property === "alt") {
            this._setAlt(value);
        } else if (property === "show-alt") {
            if (value) {
                this._altText.classList.add("shown");
            } else {
                this._altText.classList.remove("shown");
            }
            this._setAlt(this.alt, value);
        } else if (property === "no-fullscreen") {
            this._fullscreenEnabled = !value;
        }
    }

    goFullscreen() {
        if (!this._fullscreenEnabled) return;
        fullscreen.setFullscreen(this, () => this._onClose());
    }

    _setAlt(alt, altTextEnabled = this.showAlt) {
        if (altTextEnabled) {
            this._image.alt = "";
            this._altText.textContent = alt;
        } else {
            this._image.alt = alt;
            this._altText.textContent = "";
        }
    }

    _checkHash() {
        if (this._prevHash && this._prevHash === this.hash) {
            fullscreen.fullscreen = false;
        } else if (location.hash === this.hash) {
            this.goFullscreen();
        }

        this._directlyLinked =
            typeof this._prevHash === "undefined" &&
            location.hash === this.hash;
        this._prevHash = location.hash;
    }

    _onClose() {
        if (this.disableImageUrl) {
            this.fullscreen = false;
        } else {
            const current = location.href.match(/([^#]*)/)[0];

            if (!this._directlyLinked) {
                history.back();
            } else {
                history.replaceState(null, null, current);
            }

            this._checkHash();
        }
    }
}

const appendToBody = () => {
    fullscreen = document.createElement("magnon-image-fullscreen");
    document.body.appendChild(fullscreen);
};

MagnonImage.init();
