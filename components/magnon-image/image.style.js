import { css } from "../../src/literals.js";

export default css`
:host {
    display: inline-block;
}

#alt-text.shown {
    display: block;
    margin-top: 10px;
}

#alt-text {
    display: hidden;
    text-align: center;
    font-family: var(--magnon-font);
    font-size: 20px;

    transition: 0.3s opacity;
}

#main-image {
    width: 100%;
    border-radius: var(--magnon-image-border-radius);

    transition: 0.3s opacity;
}
`;
