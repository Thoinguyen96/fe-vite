module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        jsx: true,
    },
    plugins: ["react"],
    rules: {
        "react/react-in-jsx-scope": 0,
        "react/jsx-uses-react": 0,
        "react/prop-types": 0,
    },
};
