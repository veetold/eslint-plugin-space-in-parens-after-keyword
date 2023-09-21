// eslint.config.js
"use strict";

const plugin = require("./index.js");

module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
        },
        plugins: {"enforce-space-in-parens-after-keyword": plugin},
        rules: {
            "enforce-space-in-parens-after-keyword/enforce": "error",
        },
    }
]