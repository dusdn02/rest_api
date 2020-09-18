module.exports = {
    entry: ".src/indexe.ts",
    output: {
        filename: "./dist/bundle.js"
    },
    dev: Source - Map,

    resolve: {
        extenstions: ["", ".web.js", web.js, ".ts", "tsx", "js"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awsome-typescript-loader" },

            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};