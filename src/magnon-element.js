window.MagnonElement = class extends HTMLElement {
    constructor(options = { noShadow: false }) {
        super();

        this.usesShadow = !options.noShadow;
        this.usesShadyCSS = this.usesShadow && window.ShadyCSS;

        this.root = this;

        const templateName = options.template || this.name;

        const searchForTemplate = (doc) => {
            const template = doc.querySelector(`#${templateName}`);
            if (template) return template;
            else {
                for (const link of doc.querySelectorAll("link[rel=import]")) {
                    if (link.import === null) return;
                    const template = searchForTemplate(link.import);
                    if (template) return template;
                }
            }
        };

        const template = searchForTemplate(document);
        if (!template) return; // Component without elements

        const t = template.cloneNode(true);

        if (this.usesShadyCSS) window.ShadyCSS.prepareTemplate(t, this.name);

        this._instance = t.content.cloneNode(true);
        if (this.usesShadyCSS) window.ShadyCSS.styleElement(this._instance);

        if (this.usesShadow) this.root = this.attachShadow({ mode: "open" });
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
        if (this.usesShadyCSS) window.ShadyCSS.styleDocument();
    }

    restyleLocal() {
        if (this.usesShadyCSS) window.ShadyCSS.styleSubtree(this._instance);
    }

    fire(eventName, detail) {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail
        }));
    }
};
