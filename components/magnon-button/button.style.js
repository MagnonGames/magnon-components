import { css } from "../../src/literals.js";

export default css`
:host {
    --padding: 15px;
    --depth: 3px;
    display: inline-block;
}

button {
    margin-top: var(--depth);
    padding: var(--padding);

    border: none;
    outline: none;
    background: #237ACB; /* TODO: css properties */
    font-size: 15px;
    color: white;
    border-radius: 4px;
}

button:hover {
    margin-top: 0px;
    border-bottom: var(--depth) solid rgba(255, 255, 255, 0.3);
}

button:active {
    margin-top: var(--depth);
    padding-bottom: calc(var(--padding) - var(--depth));
    border-top: var(--depth) solid rgba(0, 0, 0, 0.3);
    border-bottom: none;
}
`;
