window.MagnonElement = class extends HTMLElement {
    constructor(options = { noShadow: false }) {
        super();

        this.usesShadow = !options.noShadow;
        this.usesShadyCSS = this.usesShadow && window.ShadyCSS;

        this.root = this;

        this._initProperties();
        this._initContent(options.template || this.name);
    }

    _initProperties() {
        const propertyAttributes = this.constructor._getDefaultedProperties();

        this._propertyTypes = new Map([
            ...propertyAttributes.bool.map(p => [p, "bool"]),
            ...propertyAttributes.string.map(p => [p, "string"]),
            ...propertyAttributes.number.map(p => [p, "number"])
        ]);

        this._propertyTypes.forEach((type, propertyName) => {
            const propertyCamel = dashToCamel(propertyName);
            Object.defineProperty(this, propertyCamel, {
                get() {
                    return this[`__${propertyCamel}`];
                },
                set(value) {
                    const old = this[`__${propertyCamel}`];
                    this._setProperty(propertyName, old, value);
                },
                enumerable: true
            });
        });
    }

    _initContent(templateName) {
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

    static get observedAttributes() {
        const propertyAttributes = this._getDefaultedProperties();
        return [
            ...propertyAttributes.bool,
            ...propertyAttributes.string,
            ...propertyAttributes.number
        ];
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

    static _getDefaultedProperties() {
        const propertyAttributes = this.propertyAttributes || {};
        propertyAttributes.bool = propertyAttributes.bool || [];
        propertyAttributes.string = propertyAttributes.string || [];
        propertyAttributes.number = propertyAttributes.number || [];
        return propertyAttributes;
    }

    attributeChangedCallback(attribute, old, value) {
        this._setProperty(attribute, old, value);
    }

    restyleLocal() {
        if (this.usesShadyCSS) window.ShadyCSS.styleSubtree(this._instance);
    }

    fire(eventName, detail) {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail
        }));
    }

    _setProperty(property, old, value) {
        if (this._setPropertyListenerDisabled) return;

        const type = this._propertyTypes.get(property);
        const propertyCamel = dashToCamel(property);

        if (type === "bool") value = typeof value === "boolean" ? value : this.hasAttribute(property);
        else if (type === "string") value = `${value}`;
        else if (type === "number") value = parseFloat(value);

        if (typeof value === "number" || value) {
            if (type === "bool") {
                if (!this.hasAttribute(property)) {
                    this._setPropertyListenerDisabled = true;
                    this.setAttribute(property, "");
                    this._setPropertyListenerDisabled = false;
                }
            } else {
                if (this.getAttribute(property) !== value) {
                    this._setPropertyListenerDisabled = true;
                    this.setAttribute(property, value);
                    this._setPropertyListenerDisabled = false;
                }
            }
        } else {
            this.removeAttribute(property);
        }

        this[`__${propertyCamel}`] = value;

        if (typeof this.propertySet === "function") {
            this.propertySet(property, old, value);
        }
    }
};

const dashToCamel = text => {
    return text.replace(/-([a-zA-Z0-9])/, (m, p) => {
        return p.toUpperCase();
    });
};
