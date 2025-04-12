module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "commonjs",
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/recommended",
  ],
  plugins: ["node", "import", "react"],
  globals: {
    __dirname: "readonly",
  },
  ignorePatterns: ["frontend/"],
};