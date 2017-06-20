// TODO: tests

class GlobalStyle {
    constructor() {
        this.addedStyles = new Map();
    }

    add(style) {
        const styleElement = (() => {
            const temp = document.createElement("div");
            temp.innerHTML = style;
            return temp.firstElementChild;
        })();

        document.body.appendChild(styleElement);
        this.addedStyles.set(style, styleElement);
    }

    remove(style) {
        document.body.removeChild(this.addedStyles.get(style));
        this.addedStyles.delete(style);
    }
}

export default new GlobalStyle();
