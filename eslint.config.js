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
    // views use the components defined in src/components/*.js as globals
    files: ['src/views/*.js'],
    languageOptions: {
      globals: {
        OctoMascot: 'readonly',
        ComingSoonLabel: 'readonly',
      },
    },
  },
  {
    // app.js uses ComingSoon defined in the view scripts
    files: ['src/app.js'],
    languageOptions: {
      globals: {
        ComingSoon: 'readonly',
      },
    },
  },
  {
    ignores: ['node_modules/**'],
  },
]
