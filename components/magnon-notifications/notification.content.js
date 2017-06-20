import { html } from "../../src/literals.js";

export default html`
<div id="left">
    <div id="icon"><slot name="icon"></slot></div>
</div>
<div id="right">
    <span id="title"><slot name="title"></slot></span>
    <div id="content"><slot></slot></div>
</div>

<magnon-icon-button icon="cross" class="close-button"></magnon-icon-button>
`;
