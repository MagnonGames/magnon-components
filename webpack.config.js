const path = require("path");

module.exports = {
    entry: {
        components: "./components/all.js",
        demo: ["./components/all.js", "./src/demo-fixture.js"]
    },
    output: {
        path: path.resolve(__dirname, "out/"),
        filename: "[name].js"
    }
};
