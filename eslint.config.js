import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        Vue: 'readonly',
        VueRouter: 'readonly',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z]' }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },
  {
    // router/index.js uses ComingSoon as a global from the view scripts
    files: ['src/router/index.js'],
    languageOptions: {
      globals: {
        ComingSoon: 'readonly',
      },
    },
  },
  {
    // app.js uses router defined in router/index.js
    files: ['src/app.js'],
    languageOptions: {
      globals: {
        router: 'readonly',
      },
    },
  },
  {
    ignores: ['node_modules/**'],
  },
]
