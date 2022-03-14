module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:import/recommended", "plugin:import/typescript", "prettier", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    esModuleInterop: true
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': ['error', {
      types: {
        '{}': false
      }
    }]
  }
};