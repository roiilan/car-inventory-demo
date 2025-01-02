module.exports = {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "os": false,
        },
    },
};
