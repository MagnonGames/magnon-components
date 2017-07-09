import MagnonElement from "../../src/magnon-element.js";
import { html } from "../../src/literals.js";

import css from "./switch.style.js";

import "../magnon-styles/magnon-styles.js";

export class MagnonSwitch extends MagnonElement {
    constructor() {
        super({ content:
            html`<div id="container"><span id="shade"></span><span id="handle"></span></div>` +
            css
        });
    }

    static get elementName() {
        return "magnon-switch";
    }

    static get propertyAttributes() {
        return {
            bool: ["enabled"]
        };
    }

    contentReady() {
        this.addEventListener("click", () => {
            if (this._animating) return;
            this.enabled = !this.enabled;
        });

        this._shade = this.root.querySelector("#shade");
        this._handle = this.root.querySelector("#handle");
    }

    propertySet(property, old, value) {
        if (property === "enabled") {
            if (old === value) return;

            this.fire("toggle", value);

            this._animating = true;

            let middle = true;
            const endAction = () => {
                if (middle) {
                    this._handle.className = value ? "flipped" : "";
                    middle = false;
                } else {
                    this._animating = false;
                    this._handle.removeEventListener("transitionend", endAction);
                }
            };

            this._handle.className = "middle";
            this._shade.style.opacity = value ? "0" : "";

            this._handle.addEventListener("transitionend", endAction);
        }
    }
}

MagnonSwitch.init();
