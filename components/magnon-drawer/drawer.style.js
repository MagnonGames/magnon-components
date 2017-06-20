import { css } from "../../src/literals.js";

export default css`
#container {
    display: flex;
    position: fixed;
    top: 0; bottom: 0; left: -300px;
    width: 90vw;
    height: 100vh;
    max-width: 300px;
    z-index: 10001;

    background: white;
    font-family: var(--magnon-font);

    transition: left 0.15s ease-out;
}

#main-nav > ::slotted(a) {
    color: var(--magnon-dark-teal);
    text-decoration: none;
    display: block;
    text-align: left;
    font-size: 20px;
    margin: 30px 30px;
    flex-grow: 1;
}

#blackout {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;

    background: var(--magnon-black-blue);
    opacity: 0;
    pointer-events: none;

    transition: opacity 0.2s ease-in-out;
}    
`;
