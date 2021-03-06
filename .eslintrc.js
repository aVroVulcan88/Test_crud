module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'always'],
    'no-underscore-dangle': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
  },
};
