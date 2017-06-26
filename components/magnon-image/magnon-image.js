import MagnonElement from "../../src/magnon-element.js";

import html from "./image.content.js";
import css from "./image.style.js";

import "../magnon-styles/magnon-styles.js";
import "../magnon-icon-button/magnon-icon-button.js";

let counter = 0;

export class MagnonImage extends MagnonElement {
    constructor() {
        super({ content: html + css });

        this._fullscreenEnabled = true;
    }

    static get name() {
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

        this._fullscreenContainer = this.root.querySelector("#fullscreen-container");
        this._fullscreenBackdrop = this.root.querySelector("#fullscreen-backdrop");
        this._fullscreenImage = this.root.querySelector("#fullscreen-image");
        this._fullscreenText = this.root.querySelector("#fullscreen-text");
        this._fullscreenCloseButton = this.root.querySelector(".close-button");

        this._fullscreenOpacity = "1";

        this._image.addEventListener("load", () => this._updateImageSize());
        this._image.addEventListener("click", () => {
            if (!this.disableImageUrl && location.hash.startsWith("#mimg-")) return;

            if (!this._animating && this._fullscreenEnabled) {
                if (this.disableImageUrl) {
                    this.fullscreen = true;
                } else {
                    location.hash = this._hash;
                }
            }
        });
        const close = () => {
            if (this._animating) return;

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
        };
        this._fullscreenBackdrop.addEventListener("click", close);
        this._fullscreenCloseButton.addEventListener("click", close);

        window.addEventListener("resize", () => this._updateImageSize());
        window.addEventListener("hashchange", () => this._checkHash());

        this.fullscreen = false;
    }

    get _hasDescription() {
        return this.textContent.trim().length > 0;
    }

    get _hash() {
        return `#mimg-${this._count}`;
    }

    set fullscreen(value) {
        if (value && !this._fullscreenEnabled) return;

        if (this._animating) return;

        this._animating = true;

        this.style.transform = "none";

        this._updateDescription();
        this._updateImageSize();

        if (value) {
            // Disable scroll
            document.body.style.overflow = "hidden";

            // The rest
            this._fullscreenContainer.style.pointerEvents = "all";

            this._fullscreenImage.style.opacity = "1";
            this._fullscreenBackdrop.style.opacity = this._fullscreenOpacity;

            this._image.style.transition = "none";
            this._image.style.opacity = "0";

            this._altText.style.opacity = "0";

            const startBox = this._image.getBoundingClientRect();
            const startBorderRadius = window.getComputedStyle(this._image).getPropertyValue("border-radius");
            const endBox = this._fullscreenImage.getBoundingClientRect();

            this._fullscreenImage.style.transition = "none";

            this._fullscreenImage.style.transform = `
                translate(${startBox.left - endBox.left}px, ${startBox.top - endBox.top}px)
                scale(${startBox.width / endBox.width}, ${startBox.height / endBox.height})
            `;

            this._fullscreenImage.style.borderRadius = startBorderRadius;

            setTimeout(() => {
                this._fullscreenImage.style.transition = "";

                this._fullscreenImage.style.transform = `
                    translate(0px, 0px)
                    scale(1, 1)
                `;

                this._fullscreenImage.style.borderRadius = "0";

                this._fullscreenText.style.opacity = "1";
                this._fullscreenCloseButton.style.opacity = "1";

                const endAction = () => {
                    this._fullscreenImage.removeAttribute("style");
                    this._fullscreenImage.removeEventListener("transitionend", endAction);

                    this._image.style.transition = "";

                    this._animating = false;
                };
                this._fullscreenImage.addEventListener("transitionend", endAction);
            }, 100);
        } else {
            // Enable scroll
            document.body.style.overflow = "auto";

            // The rest
            const endAction = () => {
                this.style.transform = "";

                this._fullscreenContainer.style.pointerEvents = "none";
                this._fullscreenBackdrop.removeEventListener("transitionend", endAction);

                this._animating = false;
            };

            if (this._fullscreenBackdrop.style.opacity !== "") {
                this._fullscreenBackdrop.addEventListener("transitionend", endAction);
            } else {
                this._animating = false;
            }

            this._fullscreenImage.style.opacity = "0";
            this._fullscreenBackdrop.style.opacity = "0";
            this._fullscreenText.style.opacity = "0";
            this._fullscreenCloseButton.style.opacity = "0";
            this._image.style.opacity = "1";
            this._altText.style.opacity = "1";
        }
    }

    get fullscreen() {
        return this._fullscreen;
    }

    connectedCallback() {
        this._count = counter++;

        this._checkHash();
    }

    _updateDescription() {
        if (this._hasDescription) {
            this._fullscreenText.classList.add("shown");
        } else {
            this._fullscreenText.classList.remove("shown");
        }
    }

    propertySet(property, old, value) {
        if (property === "src") {
            this._image.src = value;
            this._fullscreenImage.src = value;
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
        } else if (property === "disable-image-url") {
            this._fullscreenOpacity = value ? "0.7" : "1";
            this._fullscreenBackdrop.style.background = value
                ? "var(--magnon-black)"
                : "var(--magnon-black-blue)";
        }
    }

    _setAlt(alt, altTextEnabled = this.showAlt) {
        if (altTextEnabled) {
            this._image.alt = "";
            this._fullscreenImage.alt = "";
            this._altText.textContent = alt;
        } else {
            this._image.alt = alt;
            this._fullscreenImage.alt = alt;
            this._altText.textContent = "";
        }
    }

    _updateImageSize() {
        const textStyle = window.getComputedStyle(this._fullscreenText);
        const textWidth = textStyle.display !== "none"
            ? (this._fullscreenText.offsetWidth +
            parseFloat(textStyle.marginLeft) + parseFloat(textStyle.marginRight))
            : 0;

        const width = window.innerWidth - textWidth;
        const height = window.innerHeight;
        const imageWidth = this._image.width;
        const imageHeight = this._image.height;

        const windowRatio = width / height;
        const imageRatio = imageWidth / imageHeight;

        if (windowRatio > imageRatio) {
            this._fullscreenImage.classList.add("tall");
        } else {
            this._fullscreenImage.classList.remove("tall");
        }

        if (windowRatio < 1) {
            this._fullscreenContainer.classList.add("vertical");
        } else {
            this._fullscreenContainer.classList.remove("vertical");
        }
    }

    _checkHash() {
        if (this._prevHash && this._prevHash === this._hash) {
            this.fullscreen = false;
        } else if (location.hash === this._hash) {
            this.fullscreen = true;
        }

        this._directlyLinked =
            typeof this._prevHash === "undefined" &&
            location.hash === this._hash;
        this._prevHash = location.hash;
    }
}

MagnonImage.init();
