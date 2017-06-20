import { css } from "../../src/literals.js";

export default css`
:host {
    display: block;
    width: 100%;
    height: 300px;
    transform: translate3d(0, 0, 0);

    background: var(--magnon-black);
    color: white;

    --magnon-outline-color: white;
}

#container * {
    outline-color: var(--magnon-outline-color);
}

#container {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 1000px;

    position: relative;
    margin: auto;

    font-family: var(--magnon-font);
}

.side {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0; bottom: 0;
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

#navigation {
    flex-grow: 1;
    margin: 20px 0 0 20px;
}

#navigation a {
    color: white !important;
    text-decoration: none;
    font-size: 20px;
    display: inline-block;
    margin-bottom: 15px;
    float: left;
    clear: left;
}

#social-buttons {
    margin: 0 0 20px 10px;
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
}

#license {
    margin: 20px;
    font-size: 10px;
}
`;
