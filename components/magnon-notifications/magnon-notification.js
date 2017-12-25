import MagnonElement from "../../src/magnon-element.js";

import html from "./notification.content.js";
import css from "./notification.style.js";

import "../magnon-styles/magnon-styles.js";
import "../magnon-icon/magnon-icon.js";
import "../magnon-icon-button/magnon-icon-button.js";

export class MagnonNotification extends MagnonElement {
    constructor() {
        super({ content: html + css });
    }

    static get elementName() {
        return "magnon-notification";
    }

    static get propertyAttributes() {
        return {
            string: ["color"]
        };
    }

    contentReady() {
        this.root.querySelector(".close-button").addEventListener("click", () => this.close());

        requestAnimationFrame(() => {
            this.style.transition = "none";
            this.style.height = "0px";
            this.style.margin = "0px 0px";

            setTimeout(() => {
                this.style.height = "";
                const height = this.offsetHeight;

                this.style.height = "0px";

                setTimeout(() => {
                    this.style.transition = "";

                    this.style.margin = "";
                    this.style.height = `${height}px`;

                    this.addEventListener("animationstart", () => {
                        this.style.opacity = 1;
                    });
                }, 100);
            }, 100);
        });
    }

    propertySet(property, old, value) {
        if (property === "color") {
            const newValue = value.startsWith("--") ? `var(${value})` : value;
            this.style.setProperty("--magnon-notification-color", newValue);
        }
    }

    close() {
        this.fire("close");

        this.style.transform = "scaleY(0)";
        const end = () => {
            this.style.height = "0px";
            this.style.margin = "0px";
            this.removeEventListener("transitionend", end);
            const newEnd = () => {
                this.parentElement.removeChild(this);
                this.removeEventListener("transitionend", newEnd);
            };
            this.addEventListener("transitionend", newEnd);
        };
        this.addEventListener("transitionend", end);
    }
}

MagnonNotification.init();
