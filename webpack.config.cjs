const path = require("path");

module.exports = function (config) {

    // find "ts" rule
    const ruleIdx = config.module.rules.findIndex(r => r.test.toString().includes("\\.ts"));

    if (!ruleIdx === -1) {
        console.error("TS Rule not found");
        return;
    }

    config.module.rules[ruleIdx] = {
        test: /\.tsx?$/,
        use: [
            { loader: 'babel-loader' },
            { loader: "ts-loader" },
        ],
        include: [path.join(__dirname, "src")],
        exclude: [/node_modules/],
    }
}
