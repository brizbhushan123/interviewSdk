// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  //js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jsdoc: jsdoc
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type':'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'UPPER_CASE','snake_case'],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
          filter: {
            regex: '^[A-Za-b_]+$', // Only apply to variables that look like UPPER_CASE constants
            match: true, // Invert the match to apply to non-UPPER_CASE variables
          }
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE','snake_case'],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow"
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        }
      ],
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true
          }
        }
      ],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'off',
      'jsdoc/check-tag-names': 'warn'
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    }
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**']
  }
];
