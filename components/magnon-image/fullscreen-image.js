import MagnonElement from "../../src/magnon-element.js";

import html from "./fullscreen.content.js";
import css from "./fullscreen.style.js";

export class FullscreenImage extends MagnonElement {
    constructor() {
        super({ content: html + css });
    }

    static get elementName() {
        return "magnon-image-fullscreen";
    }

    contentReady() {
        this._fullscreenContainer = this.root.querySelector("#fullscreen-container");
        this._fullscreenBackdrop = this.root.querySelector("#fullscreen-backdrop");
        this._fullscreenImage = this.root.querySelector("#fullscreen-image");
        this._fullscreenText = this.root.querySelector("#fullscreen-text");
        this._fullscreenCloseButton = this.root.querySelector(".close-button");

        this._fullscreenOpacity = "1";

        this._fullscreenBackdrop.addEventListener("click", () => (this.fullscreen = false));
        this._fullscreenCloseButton.addEventListener("click", () => (this.fullscreen = false));

        this._fullscreenImage.addEventListener("load", () => this._updateImageSize());
        window.addEventListener("resize", () => this._updateImageSize());

        this.fullscreen = false;
    }

    setFullscreen(magnonImage, closeCallback) {
        this._emptyChildren();
        this._addChildren(magnonImage.childNodes);

        this._currentImage = magnonImage.image;
        this._currentAltText = magnonImage.altText;

        this._fullscreenImage.src = magnonImage.src;
        this._fullscreenOpacity = magnonImage.disableImageUrl ? "0.7" : "1";
        this._fullscreenBackdrop.style.background = magnonImage.disableImageUrl
            ? "var(--magnon-black)"
            : "var(--magnon-black-blue)";

        if (magnonImage.altTextEnabled) this._fullscreenImage.alt = "";
        else this._fullscreenImage.alt = magnonImage.alt;

        if (magnonImage.hasDescription) this._fullscreenText.classList.add("shown");
        else this._fullscreenText.classList.remove("shown");

        this._closeCallback = closeCallback;

        this.fullscreen = true;
    }

    set fullscreen(value) {
        if (this._animating) return;

        this._animating = true;

        if (this._currentImage) this._updateImageSize();

        if (value) {
            // Disable scroll
            document.body.style.overflow = "hidden";

            // The rest
            this._fullscreenContainer.style.pointerEvents = "all";

            this._fullscreenImage.style.opacity = "1";
            this._fullscreenBackdrop.style.opacity = this._fullscreenOpacity;

            this._currentImage.style.transition = "none";
            this._currentImage.style.opacity = "0";

            this._currentAltText.style.opacity = "0";

            const startBox = this._currentImage.getBoundingClientRect();
            const startBorderRadius = window.getComputedStyle(this._currentImage).getPropertyValue("--magnon-image-border-radius");
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

                    this._currentImage.style.transition = "";

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
            if (this._currentImage) this._currentImage.style.opacity = "1";
            if (this._currentAltText) this._currentAltText.style.opacity = "1";

            if (this._closeCallback) {
                this._closeCallback();
                this._closeCallback = null;
            }
        }
    }

    get fullscreen() {
        return this._fullscreen;
    }

    _emptyChildren() {
        let child = this.firstChild;
        while (child) {
            this.removeChild(child);
            child = this.firstChild;
        }
    }

    _addChildren(children) {
        for (let child of children) {
            this.appendChild(child.cloneNode(true));
        }
    }

    _updateImageSize() {
        const setClass = (el, name, present) => {
            if (present) el.classList.add(name);
            else el.classList.remove(name);
        };

        setClass(this._fullscreenContainer, "cramped", false);

        const vertical = window.innerWidth / window.innerHeight < 1;
        const cramped = !vertical && this.textContent.trim() !== "" && window.innerWidth < 1200;

        setClass(this._fullscreenContainer, "vertical", vertical);
        setClass(this._fullscreenContainer, "cramped", cramped);

        const textStyle = window.getComputedStyle(this._fullscreenText);
        const textWidth = textStyle.display !== "none" && !vertical
            ? (this._fullscreenText.offsetWidth +
            parseFloat(textStyle.marginLeft) + parseFloat(textStyle.marginRight))
            : 0;

        const imageSpaceRatio = (window.innerWidth - textWidth) / window.innerHeight;
        const imageRatio = this._currentImage.naturalWidth / this._currentImage.naturalHeight;

        setClass(this._fullscreenImage, "tall", imageSpaceRatio > imageRatio);

        this._fullscreenContainer.offsetWidth;
    }
}

FullscreenImage.init();
