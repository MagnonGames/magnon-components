import MagnonElement from "../../src/magnon-element.js";

import { css } from "../../src/literals.js";

import MagnonIconSet from "./icon-set.js";
import "./standard-set.js";

const style = css`
:host {
    display: inline-block;
    width: var(--magnon-icon-size, 16px);
    height: var(--magnon-icon-size, 16px);
}

svg {
    fill: var(--magnon-icon-color, black);
}
`;

export class MagnonIcon extends MagnonElement {
    constructor() {
        super({ content: `<svg width="100%" height="100%" viewBox="0 0 16 16"></svg>${style}` });
    }

    static get elementName() {
        return "magnon-icon";
    }

    static get propertyAttributes() {
        return {
            string: ["icon"]
        };
    }

    contentReady() {
        this._svg = this.root.querySelector("svg");
    }

    propertySet(property, old, value) {
        if (property === "icon") {
            const separatorIndex = value.indexOf("-");
            const setName = separatorIndex < 0 ? "standard" : value.substring(0, separatorIndex);
            const iconName = value.substring(separatorIndex + 1);

            this.changeIcon(setName, iconName);
        }
    }

    changeIcon(set, icon) {
        this._emptySvg();

        this._svg.appendChild(MagnonIconSet.getSet(set).getIcon(icon));
    }

    _emptySvg() {
        while (this._svg.childNodes[0]) {
            this._svg.removeChild(this._svg.childNodes[0]);
        }
    }
}

MagnonIcon.init();
