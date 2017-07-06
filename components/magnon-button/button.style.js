import { css } from "../../src/literals.js";

import "../magnon-styles/magnon-styles.js";

export default css`
:host {
    display: inline-block;
}

button {
    padding: 15px;
    position: relative;

    border: 2px solid var(--magnon-button-color, var(--magnon-highlight-color));
    outline: none;
    background: transparent;
    font-size: var(--magnon-button-size, 17px);
    font-family: var(--magnon-font);
    font-weight: bold;
    color: var(--magnon-button-color, var(--magnon-highlight-color));
    border-radius: 4px;
    overflow: hidden;

    transition: all 0.15s;
}

button::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    border-radius: 4px;
    background-image: linear-gradient(90deg, white 0%, transparent 100%);
    background-repeat: no-repeat;
    opacity: 0.3;
    z-index: 0;

    transition: all 0.15s;
    transform: translateX(-100%);
}

button:active::after {
    transform: translateX(0);
}

button:active {
    transform: scale(1.1);
}

button:hover, button:focus {
    background: var(--magnon-button-color, var(--magnon-highlight-color));
    color: var(--magnon-button-contrast-color, var(--magnon-highlight-contrast-color));
}

button > * {
    position: relative;
    z-index: 10;
}
`;
