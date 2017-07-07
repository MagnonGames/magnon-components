import { css } from "../../src/literals.js";

export default css`
:host {
    display: block;

    --card-padding: 30px;

    margin-top: 30px;
    margin-bottom: 70px;
}

#card {
    position: relative;
    display: flex;
    flex-direction: column;

    max-width: 100%;
    min-height: 100%;

    padding: var(--card-padding);
    box-sizing: border-box;

    background: var(--magnon-card-background, var(--magnon-content-background));
    color: var(--magnon-content-color);

    box-shadow: var(--magnon-shadow-2);
    transition: 0.5s box-shadow;
}

#card.wide {
    border-radius: 4px;
}

#category {
    margin-bottom: calc(var(--card-padding) / 2);
}

#category ::slotted(*) {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    transition: color 0.3s;
    text-decoration: none;
    margin-bottom: calc(var(--card-padding) / 3);
}

#category ::slotted(a:hover) {
    color: var(--magnon-highlight-color);
}

#title {
    color: var(--magnon-content-color);
    margin-bottom: var(--card-padding);
    text-align: center;
}

.wide #title {
    text-align: left;
}

#header {
    position: relative;
    width: calc(100% + var(--card-padding) * 2);
    height: 200px;
    top: calc(var(--card-padding) * -1);
    left: calc(var(--card-padding) * -1);
    background-size: cover;
    background-position: center;
    display: none;
}

.wide #header {
    border-radius: 4px 4px 0 0;
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
`;
