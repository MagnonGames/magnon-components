import { html } from "../../src/literals.js";

export default html`
<div id="card">
    <a>
        <span id="header"></span>
        <div id="category">
            <slot name="category"></slot>
        </div>
        <div id="title">
            <slot name="title"></slot>
        </div>
        <div id="content">
            <slot></slot>
        </div>
    </a>
    <div id="footer">
        <slot name="footer"></slot>
    </div>
</div>
`;
