const { configure, presets } = require("eslint-kit");

module.exports = configure({
    extend: {
        rules: {
            "@typescript-eslint/no-namespace": "off",
        },
    },
    presets: [
        presets.imports(),
        presets.node(),
        presets.prettier(),
        presets.typescript(),
    ],
});
