import { html } from "../../src/literals.js";

export default html`
<div id="header-container">
    <magnon-icon-button id="navigation-button" icon="menu"></magnon-icon-button>
    <div id="logo-container">
        <a id="logo-link" href="/" title="Magnon Homepage">
            <magnon-logo animate></magnon-logo>
        </a>
    </div>
    <nav>
        <slot name="nav"></slot>
    </nav>
</div>

<magnon-drawer></magnon-drawer>

<div id="main-container">
    <div id="content-container">
        <slot name="content"></slot>
    </div>

    <magnon-footer></magnon-footer>
</div>
`;
