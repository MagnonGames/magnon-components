import { html } from "../../src/literals.js";

export default html`
<div id="fullscreen-container">
    <span id="fullscreen-backdrop"></span>
    <img id="fullscreen-image"></img>
    <div id="fullscreen-text">
        <div id="description-title">
            <slot name="description-title"></slot>
        </div>
        <slot></slot>
    </div>
    <magnon-icon-button icon="cross" class="close-button"></magnon-icon-button>
</div>
`;
