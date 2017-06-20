import { css } from "../../src/literals.js";

export default css`
:host {
    position: absolute;
    display: block;

    top: 0; right: 0; left: 0;

    min-height: 100vh;

    font-family: var(--magnon-font);

    --magnon-header-height: 125px;
}

#header-container {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    display: flex;
    width: 100%;
    height: var(--magnon-header-height);
    z-index: 100;

    justify-content: center;
    flex-direction: column;

    padding: 5px;
    box-sizing: border-box;

    background: var(--magnon-shell-header-background, var(--magnon-highlight-color));
    --magnon-logo-color: var(--magnon-shell-header-color, var(--magnon-highlight-contrast-color));

    box-shadow: var(--magnon-shadow-1);
}

#header-container > * {
    flex-grow: 1;
}

#navigation-button {
    position: absolute;
    top: 5px;
    left: 5px;

    --magnon-icon-button-padding: 5px;
    --magnon-icon-color: white;
    --magnon-icon-size: 30px;

    display: none;
}

#logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

nav {
    display: flex;
    justify-content: center;
    align-items: center;
}

nav ::slotted(a) {
    color: white;
    text-decoration: none;
    font-size: 18px;
    color: var(--magnon-shell-header-color, var(--magnon-highlight-contrast-color));
    cursor: default;

    margin: 0 10px;
}

#logo-link {
    height: 40px;
    pointer-events: all;
}

#logo-link > magnon-logo {
    height: 100%;
}

#main-container {
    position: absolute;
    top: var(--magnon-header-height);
    left: 0;
    right: 0;

    width: 100%;
    min-height: calc(100% - var(--magnon-header-height));

    background: var(--magnon-shell-background, var(--magnon-background));
}

#content-container {
    position: relative;

    margin: 20px auto 350px auto;
    width: 100vw;

    box-sizing: border-box;
    min-height: 100%;

    z-index: 2;
}

#content-container.expand-content {
    width: 100%;
    max-width: 100%;
    min-height: calc(100vh - var(--magnon-header-height) + 300px);
    margin: 0 0 300px 0;
}

magnon-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
}

@media(min-width: 580px) {
    #content-container {
        width: 85vw;
    }
}

@media(min-width: 1200px) {
    #content-container {
        width: 70vw;
    }
}
`;

export const globalStyle = css`
html, body {
    padding: 0;
    margin: 0;
    overflow-y: scroll;
}
`;
