export const html = content => content instanceof Array ? content[0] : content;
export const css = style => `<style>${style instanceof Array ? style[0] : style}</style>`;
