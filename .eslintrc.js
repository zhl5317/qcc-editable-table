const path = require('path');

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        // '@vue/standard',
        'airbnb-base',
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: path.resolve(__dirname, './build/webpack.base.conf.js')
            }
        }
    },
    rules: {
        "semi": 0,
        "no-tabs": "off",
        "eol-last": 0,
        "indent": ["off", 2],
        "quotes": [0, "single"],
        "comma-dangle": [0, "never"],
        "no-undef": 0, //不能有未定义的变量
        "no-undef-init": 0, //变量初始化时不能直接给它赋值为undefined
        "singleQuote": 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 'off',
        'no-mixed-operators': 'off',
        'max-len': [1, 300],
        'default-case': 0,
        'func-names': 0,
        'no-param-reassign': 0,
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'no-lonely-if': 0,
        'import/no-extraneous-dependencies': 0,
        'global-require': 0,
        'prefer-promise-reject-errors': 'off',
        "consistent-return": 0,
        "no-prototype-builtins": 0,
        "no-restricted-globals": 0,
        "class-methods-use-this": 0,
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'operator-linebreak': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};