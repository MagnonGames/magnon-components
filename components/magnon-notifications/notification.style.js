import { css } from "../../src/literals.js";

export default css`
:host {
    position: relative;
    display: flex;
    pointer-events: all;
    min-width: 350px;

    background: var(--magnon-black);
    color: white;
    font-family: var(--magnon-font);

    border-radius: 4px;

    opacity: 0;

    margin: 10px 0;

    animation: 0.3s ease-out 0.4s 1 notification-in;
    transition: 0.2s all;
}

.close-button {
    opacity: 0.5;
    position: absolute;
    top: 5px;
    right: 5px;
    --magnon-icon-color: white;

    transition: 0.5s opacity;
}

:host(:hover) .close-button {
    opacity: 1;
}

#left {
    padding: 20px;
}

#icon {
    --magnon-icon-color: var(--magnon-notification-color, white);
    --magnon-icon-size: 48px;
}

#right {
    flex-grow: 1;
    padding: 17px 20px 17px 10px;
}

#title {
    display: block;
    color: var(--magnon-notification-color);

    font-size: 18px;
    font-weight: bold;

    margin-bottom: 10px;
}

@keyframes notification-in {
    from {
        transform: translateY(150%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
`;
