import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  // Next.js 推奨（Core Web Vitals）
  ...nextVitals,

  // TypeScript 追加（Next.js公式の併用パターン）
  ...nextTypeScript,

  // import 並び順（可読性の高い定番パターン）
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
          ],
          pathGroups: [
            // Next.js の定番 alias @/* を internal 扱い
            { pattern: '@/**', group: 'internal' },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Next.js config の ignore を明示（公式手順）
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  // Prettier 競合ルール無効化（最後に置く）
  eslintConfigPrettier,
]);
