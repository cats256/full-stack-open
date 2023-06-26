module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-alert': 'off',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
