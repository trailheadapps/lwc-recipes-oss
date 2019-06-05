module.exports = function(api) {
    api.cache(true);

    const plugins = ['@babel/plugin-syntax-dynamic-import'];

    return {
        plugins
    };
};
