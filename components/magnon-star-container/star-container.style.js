import { css } from "../../src/literals.js";

import "../magnon-styles/magnon-styles.js";

export default css`
:host {
    position: relative;
    display: flex;
    color: white;
    z-index: 0;
    background: var(--magnon-black-blue);
    background-image: radial-gradient(circle farthest-corner at center, var(--magnon-black-blue) 0%, var(--magnon-black) 150%);
}

canvas {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

#content {
    width: 100%;
    flex-grow: 1;
    z-index: 1;
}
`;
