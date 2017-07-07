import MagnonElement from "../../src/magnon-element.js";

import { html, css } from "../../src/literals.js";

import { MagnonSocialButton } from "./magnon-social-button.js";
import "../magnon-icon/social-set.js";

export { MagnonSocialButton };

const content = html`
<div id="container">
    <magnon-social-button></magnon-social-button>
</div>
`;

const style = css`
:host {
    display: inline-block;
}
`;

export const createSocialIconButton = (name, icon, color, hrefTemplate, titleTemplate, userTemplate, idURL) => {
    const socialIconButton = class extends MagnonElement {
        constructor() {
            super({ content: content + style });
        }

        static get elementName() {
            return name;
        }

        static get propertyAttributes() {
            return {
                string: ["user", "id"]
            };
        }

        contentReady() {
            this.root.querySelector("#container").style.setProperty(
                "--magnon-icon-color",
                `var(--magnon-social-icon-button-color, ${color})`
            );

            this._button = this.root.querySelector("magnon-social-button");
            this._button.setAttribute("icon", icon);
        }

        propertySet(property, old, value) {
            if (property === "user") {
                if (!idURL) this._button.setAttribute("href", hrefTemplate(value));
                this._button.setAttribute("title", titleTemplate(value));
                this._button.setAttribute("user", userTemplate(value));
            } else if (property === "id" && idURL) {
                this._button.setAttribute("href", hrefTemplate(value));
            }
        }
    };

    socialIconButton.init();
};

const userTmpl = (strings) => user => strings[0] + user + strings[1];

createSocialIconButton(
    "magnon-twitter-button",
    "social-twitter",
    "#1DA1F3",
    userTmpl`https://twitter.com/${0}`,
    userTmpl`Follow @${0} on Twitter!`,
    userTmpl`@${0}`
);

createSocialIconButton(
    "magnon-gplus-button",
    "social-gplus",
    "#DB4437",
    userTmpl`https://plus.google.com/+${0}`,
    userTmpl`Add +${0} on Google+!`,
    userTmpl`+${0}`
);

createSocialIconButton(
    "magnon-twitch-button",
    "social-twitch",
    "#6441A4",
    userTmpl`https://www.twitch.tv/${0}`,
    userTmpl`Follow ${0} on Twitch!`,
    userTmpl`${0}`
);

createSocialIconButton(
    "magnon-youtube-button",
    "social-youtube",
    "#CD201F",
    userTmpl`https://www.youtube.com/channel/${0}`,
    userTmpl`Subscribe to ${0} on YouTube!`,
    userTmpl`${0}`,
    true
);

createSocialIconButton(
    "magnon-github-button",
    "social-github",
    "#171515",
    userTmpl`https://github.com/${0}`,
    userTmpl`Follow ${0} on Github!`,
    userTmpl`${0}`
);

createSocialIconButton(
    "magnon-bitbucket-button",
    "social-bitbucket",
    "#172B4D",
    userTmpl`https://bitbucket.org/${0}/`,
    userTmpl`Check out ${0} on BitBucket`,
    userTmpl`${0}`
);

createSocialIconButton(
    "magnon-feedly-button",
    "social-rss",
    "#101010",
    userTmpl`http://cloud.feedly.com/#subscription/feed/${0}/rss/`,
    userTmpl`Follow ${0} on Feedly!`,
    userTmpl`${0}`,
    true
);
