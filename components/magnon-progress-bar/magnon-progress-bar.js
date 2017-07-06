import MagnonElement from "../../src/magnon-element.js";

import "../magnon-styles/magnon-styles.js";

class MagnonProgressBar extends MagnonElement {
    constructor() {
        super({ content: `
            <style>
                :host {
                    display: block;
                    height: 3px;
                    min-width: 100px;
                }

                #container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transition: opacity 0.2s;
                    background: rgba(0, 0, 0, 0.1);
                }

                #filler {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0; right: 0; bottom: 0; left: 0;
                    background: var(--magnon-progress-bar-color, var(--magnon-highlight-color));
                    transform: scaleX(0);
                    transform-origin: center left;
                    transition: transform 0.05s ease-in-out;
                }
            </style>

            <div id="container">
                <span id="filler"></span>
            </div>
        ` });
    }

    static get elementName() {
        return "magnon-progress-bar";
    }

    static get propertyAttributes() {
        return {
            number: ["progress"],
            bool: ["visible"]
        };
    }

    contentReady() {
        this._container = this.root.querySelector("#container");
        this._filler = this.root.querySelector("#filler");
    }

    propertySet(property, old, value) {
        if (property === "progress") {
            this._filler.style.transform = `
                scaleX(${value / 100})
            `;
        } else if (property === "visible") {
            this._container.style.opacity = value ? 1 : 0;
        }
    }
}

MagnonProgressBar.init();
