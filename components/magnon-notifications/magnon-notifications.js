import MagnonElement from "../../src/magnon-element.js";

import { css } from "../../src/literals.js";

import "./magnon-notification.js";

const style = css`
:host {
    display: flex;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 1000;
    pointer-events: none;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;

    padding: 20px 40px;
}

::slotted(magnon-notification) {
    flex-shrink: 0;
    max-width: 30%;
}
`;

export class MagnonNotifications extends MagnonElement {
    constructor() {
        super({ content: `<slot></slot>${style}` });
    }

    static get name() {
        return "magnon-notifications";
    }

    static appendToBody() {
        if (window.MAGNON_COMPONENTS_DISABLE_GLOBAL) return;

        const append = () => {
            const notificationContainer = document.createElement("magnon-notifications");
            this.notificationContainer = notificationContainer;
            document.body.appendChild(notificationContainer);
        };

        if (document.readyState !== "loading") {
            append();
        } else {
            document.addEventListener("DOMContentLoaded", () => append());
        }
    }

    static send(template) {
        if (typeof template !== "string") {
            const instance = template.content.cloneNode(true);
            this.notificationContainer.appendChild(instance);
        } else {
            this.notificationContainer.innerHTML += template;
        }

        const notifications = this.notificationContainer.querySelectorAll("magnon-notification");
        return notifications[notifications.length - 1];
    }
}

MagnonNotifications.init();
MagnonNotifications.appendToBody();

window.MagnonNotifications = MagnonNotifications;
