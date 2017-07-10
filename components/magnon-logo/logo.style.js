import { css } from "../../src/literals.js";

export default css`
:host {
    display: inline-block;
    min-height: 30px;
    height: 50px;
}

#container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 0;
}

#icon {
    height: 100%;

    fill: var(--magnon-logo-color, white);
    stroke: none;

    transition: transform 0.7s ease;
    transform-origin: 50% 50%;
}

#icon > path {
    transition: opacity 0.9s;
}

#text {
    height: 100%;

    fill: none;
    stroke: var(--magnon-logo-color, white);
    stroke-width: 2;
}

#text > path {
    transition: stroke-dashoffset 0.7s;
}
`;
