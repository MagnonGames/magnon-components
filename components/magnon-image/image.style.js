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

#fullscreen-container {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 100000;
    pointer-events: none;
}

#fullscreen-container.vertical {
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    overflow: auto;
}

#fullscreen-backdrop {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%;
    height: 100%;
    background: var(--magnon-black-blue);

    transition: 0.3s opacity ease-out;
}

#fullscreen-image {
    z-index: 1;
    width: var(--magnon-image-size-percent, 70%);
    height: auto;

    margin: 0 100px;

    transform-origin: top left;
    transition: all 0.3s ease-out;
}

#fullscreen-image.tall {
    width: auto;
    height: var(--magnon-image-size-percent, 70%);
}

#fullscreen-container.cramped #fullscreen-image {
    margin: 0 20px;
}

#fullscreen-container.vertical #fullscreen-image {
    width: var(--magnon-image-size-percent, 50%);
    height: auto;
    margin-top: 30px;
}

#fullscreen-text {
    display: none;
    color: white;
    z-index: 1;
    font-family: var(--magnon-font);
    max-width: 40%;
    margin-right: 100px;
    opacity: 0;

    transition: 0.3s opacity;
}

#fullscreen-text.shown {
    display: block;
}

#fullscreen-container.vertical #fullscreen-text {
    margin: 30px;
    max-width: none;
}

#fullscreen-container.cramped #fullscreen-text {
    align-self: flex-start;
    height: 100%;
    overflow: auto;
    margin-right: 30px;
}

#description-title {
    display: block;
    font-size: 30px;
    margin-bottom: 20px;
}

.close-button {
    position: absolute;
    top: 40px;
    right: 40px;
    --magnon-icon-color: white;
    transition: 0.3s opacity;
}
`;
