import { html } from "../../src/literals.js";

export default html`
<div id="container">
    <nav id="main-nav">
        <slot name="nav"></slot>
    </nav>
</div>

<span id="blackout"></span>
`;
