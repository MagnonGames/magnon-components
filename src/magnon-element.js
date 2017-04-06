/* globals ShadyCSS */
window.MagnonElement = class extends HTMLElement {
    constructor(options = { shadow: true }) {
        super();

        this.usesShadow = options.shadow;
        this.usesShadyCSS = options.shadow && ShadyCSS;

        const searchForTemplate = (doc) => {
            const template = doc.querySelector(`#${this.name}`);
            if (template) return template;
            else {
                for (const link of doc.querySelectorAll("link[rel=import]")) {
                    const template = searchForTemplate(link.import);
                    if (template) return template;
                }
            }
        };

        const t = searchForTemplate(document);
        if (!t) return; // Component without elements

        if (this.usesShadyCSS) ShadyCSS.prepareTemplate(t, this.name);

        this._instance = t.content.cloneNode(true);
        if (this.usesShadyCSS) ShadyCSS.styleElement(this._instance);

        this.root = options.shadow ? this.attachShadow({ mode: "open" }) : this;
        this.root.appendChild(this._instance);
    }

    static get name() {
        throw new TypeError("Element is missing an element name declaration");
    }

    get name() {
        return this.constructor.name;
    }

    static init() {
        customElements.define(this.name, this);
    }

    static restyle() {
        if (this.usesShadyCSS) ShadyCSS.styleDocument();
    }

    restyleLocal() {
        if (this.usesShadyCSS) ShadyCSS.styleSubtree(this._instance);
    }

    fire(eventName, detail) {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail
        }));
    }
};
