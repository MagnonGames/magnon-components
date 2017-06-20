import MagnonElement from "./magnon-element.js";
import GlobalStyle from "./global-style.js";

import { css } from "./literals.js";

const style = css`
html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
}

#controls {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    font-family: var(--magnon-font);
}

input, button {
    margin: 0 10px;
}
`;

GlobalStyle.add(style);

export class DemoFixture extends MagnonElement {
    constructor() {
        super({ noShadow: true });
    }

    static get name() {
        return "demo-fixture";
    }

    static range(query, action, value = null) {
        const range = document.querySelector(query);
        range.addEventListener("input", e => {
            action(range.value);
        });
        if (value !== null) range.value = value;
    }
}

window.DemoFixture = DemoFixture;

DemoFixture.init();
