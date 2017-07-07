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

    box-sizing: border-box;

    background: var(--magnon-card-background, var(--magnon-content-background));
    color: var(--magnon-content-color);

    box-shadow: var(--magnon-shadow-2);
    transition: 0.2s all;
}

#card.wide {
    border-radius: 4px;
}

#card.link:hover {
    box-shadow: var(--magnon-shadow-3);
    transform: scale(1.01);
}

a {
    text-decoration: none;
    color: inherit;
}

#header {
    position: relative;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    display: none;
}

#header.big {
    height: 400px;
}

.wide #header {
    border-radius: 4px 4px 0 0;
}

#category {
    padding: var(--card-padding);
    padding-bottom: calc(var(--card-padding) / 2);
    text-align: center;
}

.wide #category {
    text-align: left;
}

#category ::slotted(*) {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    transition: color 0.3s;
    text-decoration: none;
    margin-bottom: calc(var(--card-padding) / 3);
}

#title {
    color: var(--magnon-content-color);
    padding: var(--card-padding);
    padding-top: 0;
    text-align: center;
}

.wide #title {
    text-align: left;
}

#content {
    flex-grow: 1;
    padding: 0 var(--card-padding);
}

#footer {
    padding: var(--card-padding);
}

#title ::slotted(h1) { margin: 0; } #title ::slotted(h2) { margin: 0; }
#title ::slotted(h3) { margin: 0; } #title ::slotted(h4) { margin: 0; }
#title ::slotted(h5) { margin: 0; } #title ::slotted(h6) { margin: 0; }
`;
