import { css } from "../../src/literals.js";

import GlobalStyle from "../../src/global-style.js";

GlobalStyle.add(css`
/* latin-ext */
@font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 300;
    src: local("Raleway Light"), local("Raleway-Light"), url(https://fonts.gstatic.com/s/raleway/v11/ZKwULyCG95tk6mOqHQfRBCEAvth_LlrfE80CYdSH47w.woff2) format("woff2");
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 300;
    src: local("Raleway Light"), local("Raleway-Light"), url(https://fonts.gstatic.com/s/raleway/v11/-_Ctzj9b56b8RgXW8FArifk_vArhqVIZ0nv9q090hN8.woff2) format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}

html {
    /* Fonts */
    --magnon-font: "Raleway", sans-serif;

    /* Colors */
    --magnon-neon-blue: #3C9AF1;
    --magnon-neon-pink: #E73077;
    --magnon-neon-teal: #3DFAA6;
    --magnon-neon-red: #EB4C55;
    --magnon-neon-yellow: #F5FF2E;
    --magnon-neon-purple: #B057FF;
    --magnon-neon-green: #43E061;

    --magnon-normal-blue: #2F79BE;
    --magnon-normal-pink: #BA2660;
    --magnon-normal-teal: #30C683;
    --magnon-normal-red: #B13940;
    --magnon-normal-yellow: #AEB600;
    --magnon-normal-purple: #8843C6;
    --magnon-normal-green: #32A748;

    --magnon-dark-blue: #235A8C;
    --magnon-dark-pink: #8B1D48;
    --magnon-dark-teal: #217751;
    --magnon-dark-red: #6C2327;
    --magnon-dark-yellow: #717700;
    --magnon-dark-purple: #61308C;
    --magnon-dark-green: #257C36;

    --magnon-black-blue: #1A232C;
    --magnon-black: #101010;
    --magnon-dark-grey: #212121;
    --magnon-grey: #F4F4F4;

    /* Shadow */
    --magnon-shadow-0: none;
    --magnon-shadow-1: 0px 1px 5px 0px rgba(0, 0, 0, 0.4);
    --magnon-shadow-2: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
    --magnon-shadow-3: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);

    /* Theming */
    --magnon-background: var(--magnon-grey);
    --magnon-content-background: white;
    --magnon-content-color: var(--magnon-black);
    --magnon-highlight-color: var(--magnon-normal-blue);
    --magnon-highlight-contrast-color: white;
}
`);
