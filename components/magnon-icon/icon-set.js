import MagnonElement from "../../src/magnon-element.js";

const sets = [];

export default class MagnonIconSet extends MagnonElement {
    constructor(name, content) {
        super({ content: `<slot></slot>` });
        if (name && content) this._register(name, content);
    }

    static get name() {
        return "magnon-icon-set";
    }

    static getSet(name) {
        for (let set of sets) {
            if (set.setName === name) return set;
        }
        console.error(`Icon set not found: ${name}`);
    }

    contentReady() {
        this._slot = this.root.querySelector("slot");
    }

    connectedCallback() {
        this._register(this.getAttribute("set-name"));
    }

    getIcon(name) {
        const svg = this._slot.assignedNodes().find(n => n.tagName === "svg");
        const icon = svg.querySelector(`#${name}`);
        if (!icon) {
            throw new Error(`Icon set "${this.setName}" doesn't contain a "${name}" icon!`);
        }
        const node = icon.cloneNode(true);
        return node;
    }

    _register(name, content) {
        this.setName = name;
        if (content) this.innerHTML = content;
        sets.push(this);
    }
}

MagnonIconSet.init();
