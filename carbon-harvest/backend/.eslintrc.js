module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'jsdoc',
  ],
  rules: {
    'jsdoc/require-jsdoc': ['error', {
      publicOnly: true,
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: true,
        FunctionExpression: true,
      },
    }],
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-returns-description': 'error',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': ['warn', { allow: ['error', 'warn'] }],
  },
};
