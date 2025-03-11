const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: {
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                ],
            },
        },

        // plugins: {
        //     add: [
        //         new webpack.DefinePlugin({
        //             process: { env: {} }
        //         })
        //     ]
        // }


    },
};