export default class MagnonElement extends HTMLElement {
    constructor(options = { noShadow: false, content: "" }) {
        super();

        this.usesShadow = !options.noShadow;
        this.usesShadyCSS = this.usesShadow && window.ShadyCSS;

        this.root = this;

        this._initProperties();
        this._initContent(options.content);
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

    _initContent(content = `#${this.elementName}`) {
        let template;
        if (content.match(/^[.|#]/)) {
            template = this._getTemplate(content);
        } else {
            const el = document.createElement("template");
            el.innerHTML = content;
            template = el;
        }
        console.log(content, template);
        const t = template.cloneNode(true);

        if (this.usesShadyCSS) window.ShadyCSS.prepareTemplate(t, this.elementName);

        this._instance = t.content.cloneNode(true);
        if (this.usesShadyCSS) window.ShadyCSS.styleElement(this._instance);

        if (this.usesShadow) this.root = this.attachShadow({ mode: "open" });
        this.root.appendChild(this._instance);

        if (this.contentReady) this.contentReady();
    }

    _getTemplate(query) {
        const searchForTemplate = (doc) => {
            const template = doc.querySelector(query);
            if (template) return template;
            else {
                for (const link of doc.querySelectorAll("link[rel=import]")) {
                    if (link.import === null) return;
                    const template = searchForTemplate(link.import);
                    if (template) return template;
                }
            }
        };

        return searchForTemplate(document);
    }

    static get observedAttributes() {
        const propertyAttributes = this._getDefaultedProperties();
        return [
            ...propertyAttributes.bool,
            ...propertyAttributes.string,
            ...propertyAttributes.number
        ];
    }

    static get elementName() {
        throw new TypeError("Element is missing an element name declaration");
    }

    get elementName() {
        return this.constructor.elementName;
    }

    static init() {
        customElements.define(this.elementName, this);
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
        const type = this._propertyTypes.get(attribute);

        if (type === "bool") value = value || this.hasAttribute(attribute);

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

        if (type === "bool") {
            old = Boolean(old);
            value = Boolean(value);
        } else if (type === "string") {
            value = `${value}`;
        } else if (type === "number") {
            value = parseFloat(value);
        }

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
            this._setPropertyListenerDisabled = true;
            this.removeAttribute(property);
            this._setPropertyListenerDisabled = false;
        }

        this[`__${propertyCamel}`] = value;

        if (typeof this.propertySet === "function") {
            this.propertySet(property, old, value);
        }
    }
};

window.MagnonElement = MagnonElement;

const dashToCamel = text => {
    return text.replace(/-([a-zA-Z0-9])/g, (m, p) => {
        return p.toUpperCase();
    });
};
