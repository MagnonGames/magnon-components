import MagnonElement from "../../src/magnon-element.js";

import css from "./icon-button.style.js";

import "../magnon-icon/magnon-icon.js";

export class MagnonIconButton extends MagnonElement {
    constructor() {
        super({ content: `<button><magnon-icon></magnon-icon></button>` + css });
    }

    static get elementName() {
        return "magnon-icon-button";
    }

    static get propertyAttributes() {
        return {
            string: ["icon", "title"],
            number: ["tabindex"]
        };
    }

    contentReady() {
        this._button = this.root.querySelector("button");
        this._icon = this.root.querySelector("magnon-icon");

        if (this.parentElement && this.parentElement.tagName === "A") {
            this._button.setAttribute("aria-hidden", "true");
        }
    }

    propertySet(property, old, value) {
        if (property === "icon") {
            this._icon.setAttribute("icon", value);
            if (!this.title) {
                this._setTitleFromIconName(value);
            }
        } else if (property === "title") {
            if (value && value.length > 0) {
                this._button.setAttribute("aria-label", value);
            } else {
                this._setTitleFromIconName(this.icon);
            }
        } else if (property === "tabindex") {
            // BUG: It doesn't seem like the polyfill takes into account
            // tabindex incapsulation of shadowdom. This is a workaround.
            this._button.setAttribute("tabindex", value);
        }
    }

    _setTitleFromIconName(iconName) {
        const dashIndex = iconName.indexOf("-");
        const betterName = (
            iconName.charAt(dashIndex + 1).toUpperCase() +
            iconName.slice(dashIndex + 2)
        ).replace(/-/g, " ");
        this._button.setAttribute("aria-label", betterName);
    }
}

MagnonIconButton.init();
