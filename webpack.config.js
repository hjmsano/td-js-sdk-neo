module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: __dirname + '/dist',
        filename: 'pt.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules | docs)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            }
        ]
    }
};