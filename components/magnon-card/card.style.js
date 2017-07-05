import { css } from "../../src/literals.js";

export default css`
:host {
    display: block;

    --card-padding: 30px;

    margin-top: 50px;
    margin-bottom: 30px;
}

#card {
    position: relative;
    display: flex;
    flex-direction: column;

    max-width: 100%;
    min-height: 100%;

    padding: var(--card-padding);
    padding-top: 70px;
    box-sizing: border-box;

    background: var(--magnon-card-background, var(--magnon-content-background));
    color: var(--magnon-content-color);

    box-shadow: var(--magnon-shadow-2);
    transition: 0.5s box-shadow;
}

#card.shadow {
    box-shadow: none;
}

#title {
    position: absolute;
    top: -25px;
    left: 10px;
    background: inherit;
    box-shadow: var(--magnon-shadow-2);
    padding: 15px 30px;
    height: 30px;
    width: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

#header {
    position: relative;
    width: calc(100% + var(--card-padding) * 2);
    height: 200px;
    top: -70px;
    left: calc(var(--card-padding) * -1);
    background-size: cover;
    background-position: center;
    margin-bottom: -50px;
    display: none;
}

#content {
    flex-grow: 1;
}

#footer {
    margin-top: var(--card-padding);
}

#title ::slotted(h1) { margin: 0; } #title ::slotted(h2) { margin: 0; }
#title ::slotted(h3) { margin: 0; } #title ::slotted(h4) { margin: 0; }
#title ::slotted(h5) { margin: 0; } #title ::slotted(h6) { margin: 0; }

@media(min-width: 580px) {
    #card {
        border-radius: 4px;
    }

    #title {
        left: auto;
        width: auto;
    }

    #header {
        border-radius: 4px 4px 0 0;
    }
}
`;
