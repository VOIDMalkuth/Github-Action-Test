module.exports = {
    publicPath: "./",
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#0AA679',
                        'success-color': '#40c9ff',
                        'font-size-base': '15px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};