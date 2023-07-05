module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-alert': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
    'no-param-reassign': 0,
  },
};
