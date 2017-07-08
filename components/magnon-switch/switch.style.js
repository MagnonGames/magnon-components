import { css } from "../../src/literals.js";

export default css`
:host {
    display: inline-block;
}

#container {
    position: relative;
    height: 30px;
    width: 54px;
    overflow: hidden;
    border-radius: 30px;
    transform: translate3d(0, 0, 0);

    background: var(--magnon-switch-handle-color, var(--magnon-highlight-color));
}

#shade {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0; right: 0; bottom: 0; left: 0;
    background: black;
    opacity: 0.8;

    transition: 0.2s opacity;
}

#handle {
    position: absolute;
    display: flex;
    top: 3px; left: 3px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;

    border-radius: 14px;

    background: var(--magnon-handle-color, var(--magnon-highlight-contrast-color));

    transition: 0.15s transform;
}

#handle.middle {
    transform: translateX(50%) scale(0.3, 0);
}

#handle.flipped {
    transform: translateX(100%) scale(1);
}
`;
