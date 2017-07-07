import { html } from "../../src/literals.js";

export default html`
<div id="card">
    <span id="header"></span>
    <div id="title">
        <slot name="title"></slot>
    </div>
    <div id="content">
        <slot></slot>
    </div>
    <div id="footer">
        <slot name="footer"></slot>
    </div>
</div>
`;
