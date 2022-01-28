module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.android.js',
          '.android.jsx',
          '.android.ts',
          '.android.tsx',
          '.ios.js',
          '.ios.jsx',
          '.ios.ts',
          '.ios.tsx',
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx'
        ]
      }
    }
  },
  rules: {
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    'no-empty-pattern': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/no-extraneous-dependencies': 2,
    'import/extensions': ['error', 'never', { svg: 'always' }],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
    'import/prefer-default-export': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/no-unused-modules': 0,
    'import/no-deprecated': 0,
    '@typescript-eslint/indent': 0,
    'import/no-anonymous-default-export': 2,
    camelcase: 1,
    'prefer-destructuring': 2,
    'no-nested-ternary': 2,
    'comma-dangle': 0,
  }
}
