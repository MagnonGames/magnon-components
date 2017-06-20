import { html } from "../../src/literals.js";

export default html`
<div id="container">
    <div id="left" class="side">
        <nav id="navigation">
            <slot name="navigation">
                <a href="/">Home</a>
                <a href="/about">About Us</a>
                <a href="/games">Games</a>
                <a href="https://blog.magnon.net">Blog</a>
                <a href="/contact">Contact</a>
            </slot>
        </nav>

        <div id="social-buttons">
            <slot name="social-buttons">
                <magnon-gplus-button user="MagnonNet"></magnon-gplus-button>
                <magnon-twitter-button user="theMagnon"></magnon-twitter-button>
                <magnon-twitch-button user="themagnon"></magnon-twitch-button>
                <magnon-youtube-button user="Magnon" id="UCZlenKi3wRj3Usc3cXTsA2Q"></magnon-youtube-button>
            </slot>
        </div>
    </div>

    <div id="right" class="side">
        <div id="announcement">
            <div id="announcement-title">
                <slot name="announcement-title"></slot>
            </div>
            <slot name="announcement"></slot>
        </div>

        <div id="license">
            <slot name="licence"></slot>
        </div>
    </div>
</div>
`;
