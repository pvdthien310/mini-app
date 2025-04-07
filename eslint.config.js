import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';

const prettierRules = {
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      endOfLine: 'auto',
    },
  ],
};

const config = [
  // Base configuration for JavaScript files
  {
    files: ['**/*.js', '**/*.mjs'],
    ...js.configs.recommended,
    rules: {
      ...prettierRules,
    },
    plugins: {
      prettier,
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
      react,
      prettier,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...prettierRules,
      'import/extensions': 'off',
      'react/function-component-definition': 'off',
      'react/destructuring-assignment': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'import/prefer-default-export': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'jsx-a11y/label-has-associated-control': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'react/no-danger': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
    },
  },
];

export default config;

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended-type-checked",
//     "plugin:@typescript-eslint/stylistic-type-checked",
//     "plugin:react/recommended",
//     "plugin:react/jsx-runtime",
//     "plugin:react-hooks/recommended",
//     "prettier",
//   ],
//   ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//     project: ["./tsconfig.json", "./tsconfig.node.json"],
//     tsconfigRootDir: __dirname,
//   },
//   plugins: ["react-refresh"],
//   rules: {
//     "react-refresh/only-export-components": [
//       "warn",
//       { allowConstantExport: true },
//     ],
//     "react/react-in-jsx-scope": "off",
//   },
// };
