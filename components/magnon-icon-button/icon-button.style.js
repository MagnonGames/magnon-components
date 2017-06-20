import { css } from "../../src/literals.js";

export default css`
:host {
    display: inline-block;
}

button {
    padding: var(--magnon-icon-button-padding, 10px);
    font-size: 0;

    border: none;
    border-radius: 50%;
    background-color: transparent;

    transition: background 0.15s ease-out;
    outline: none;
}

button:focus {
    background: rgba(46, 163, 111, 0.5);
}

button:active {
    background: rgba(46, 163, 111, 0.8);
}

button::-moz-focus-inner {
    padding: 0;
}
`;
