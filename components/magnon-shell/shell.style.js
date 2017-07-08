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

#header-container nav {
    display: flex;
    justify-content: center;
    align-items: center;
}

#header-container nav ::slotted(a) {
    color: white !important;
    text-decoration: none;
    font-size: 18px;
    font-family: var(--magnon-header-font);
    color: var(--magnon-shell-header-color, var(--magnon-highlight-contrast-color));
    cursor: pointer;

    margin: 0 10px;
}

#logo-link {
    height: 40px;
    pointer-events: all;
    font-family: var(--magnon-header-font);
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

#logo-link > magnon-logo {
    height: 100%;
}

#site-title:not(:empty) {
    margin-left: 0.5ch;
}

#main-container {
    position: absolute;
    top: var(--magnon-header-height);
    left: 0;
    right: 0;

    width: 100%;
    min-height: calc(100% - var(--magnon-header-height));
    display: flex;
    flex-direction: column;
    overflow: hidden;

    background: var(--magnon-shell-background, var(--magnon-background));
}

#content-container {
    position: relative;

    margin: 20px auto 0 auto;
    width: 100vw;

    box-sizing: border-box;
    min-height: 100%;
    flex-grow: 1;

    z-index: 2;
}

#content-container.expand-content {
    width: 100%;
    max-width: 100%;
    min-height: calc(100vh - var(--magnon-header-height) + 300px);
    margin: 0;
}

#footer {
    display: inline-block;
    width: 100%;
    min-height: 300px;
    transform: translate3d(0, 0, 0);

    background: var(--magnon-black);
    color: white;

    --magnon-outline-color: white;

    width: 100%;
    z-index: 100;
}

#footer-container * {
    outline-color: var(--magnon-outline-color);
}

#footer-container {
    width: 100%;
    min-height: 300px;
    max-width: 1000px;

    position: relative;
    margin: auto;

    font-family: var(--magnon-font);
}

.side {
    width: 100%;
    height: auto;
    position: relative;
    text-align: center;
}

#right * {
    color: white !important;
}

#footer-navigation {
    flex-grow: 1;
    margin: 20px 0 0 0;
}

#footer-navigation ::slotted(a) {
    color: white !important;
    text-decoration: none;
    font-size: 20px;
    display: block;
    margin-bottom: 15px;
}

#social-buttons {
    --magnon-social-icon-button-color: white;
}

#announcement {
    flex-grow: 1;
    margin: 20px;
}

#announcement-title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    font-family: var(--magnon-header-font);
}

#license {
    margin: 20px;
    font-size: 13px;
}

@media(min-width: 580px) {
    #content-container {
        width: 85vw;
    }

    #footer {
        display: block;
    }

    #footer-container {
        flex-direction: row;
        display: flex;
    }

    .side {
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0; bottom: 0;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    #left {
        left: 0;
    }

    #right {
        right: 0;
        text-align: right;
    }

    #footer-navigation {
        margin: 20px 0 0 20px;
    }

    #social-buttons {
        margin: 0 0 20px 10px;
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
    font-size: 18px;
    font-family: var(--magnon-font)
    outline-color: white;
}

a {
    color: var(--magnon-highlight-color);
    transition: color 0.2s;
}

a:hover, a:focus {
    color: var(--magnon-black);
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--magnon-header-font);
    font-weight: bold;
}

h1 {
    font-size: 40px;
}

h2 {
    font-size: 30px;
}

h3 {
    font-size: 28px;
}

h4 {
    font-size: 25px;
}

h5 {
    font-size: 22px;
}

h6 {
    font-size: 20px;
}

hr {
    margin: 40px 15%;
    height: 0px;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}
`;
