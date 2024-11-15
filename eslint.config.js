import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Shared rules for both JS and TS files
const sharedRules = {
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      },
      'newlines-between': 'always'
    }
  ]
}

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'build', 'public', 'coverage']
  },
  // JavaScript files config
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [js.configs.recommended],
    plugins: {
      import: importPlugin
    },
    rules: {
      ...sharedRules
    }
  },
  // TypeScript files config
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylistic
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.app.json'  // Updated to point directly to tsconfig.app.json
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin
    },
    rules: {
      ...sharedRules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
)
