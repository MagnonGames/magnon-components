import { html } from "../../src/literals.js";

export default html`
<div id="header-container">
    <magnon-icon-button id="navigation-button" icon="menu"></magnon-icon-button>
    <div id="logo-container">
        <a id="logo-link" href="/" title="Home">
            <magnon-logo></magnon-logo>
            <span id="site-title"></span>
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

    <div id="footer">
        <div id="footer-container">
            <div id="left" class="side">
                <nav id="footer-navigation">
                    <slot name="footer-navigation">
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
                    <slot name="license"></slot>
                </div>
            </div>
        </div>
    </div>
</div>
`;
