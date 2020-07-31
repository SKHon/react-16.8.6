const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
//const resolveAlias = dir => path.join(__dirname, '.', dir)
const path = require('path')
module.exports = override(
    
    addWebpackAlias({
        "react": path.resolve(__dirname, "src/react/react"),
        'react-dom': path.resolve(__dirname, 'src/react/react-dom'),
        'react-reconciler': path.resolve(__dirname, 'src/react/react-reconciler')
    })
);
