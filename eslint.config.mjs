import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import pluginJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';

import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [...next, ...nextCoreWebVitals, ...nextTypescript, {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
}, {
    languageOptions: {
        ecmaVersion: 'latest',
        globals: { ...globals.browser, ...globals.node }
    }
}, {
    settings: {
        react: {
            version: 'detect'
        }
    }
}, // ? https://github.com/eslint/eslint
pluginJs.configs.recommended, // ? https://github.com/import-js/eslint-plugin-import
importPlugin.flatConfigs.recommended, // ? https://github.com/typescript-eslint/typescript-eslint
...tseslint.configs.recommended, // ? https://github.com/eslint-community/eslint-plugin-promise
pluginPromise.configs['flat/recommended'], // ? https://github.com/jsx-eslint/eslint-plugin-react
pluginReact.configs.flat.recommended, // ? https://github.com/jsx-eslint/eslint-plugin-react
pluginReact.configs.flat['jsx-runtime'], // ? https://github.com/prettier/eslint-config-prettier
eslintConfigPrettier, // ? https://github.com/francoismassart/eslint-plugin-tailwindcss
...tailwind.configs['flat/recommended'], {
    rules: {
        'no-unused-vars': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'newline-before-return': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/migration-from-tailwind-2': 'off',
        'import/no-unresolved': 'off',
        'import/no-named-as-default': 'off'
    }
}, // ! ===================== DISCLAIMER =====================
// ! There is no official solution available for new ESLint 9 flat config structure for NextJS
// ! The solution is taken from the community and may not be the best practice, use it at your own risk
// ? Ref: https://github.com/vercel/next.js/discussions/49337?sort=top#discussioncomment-5998603
// ! ======================================================
{
    plugins: {
        '@next/next': nextPlugin
    },
    rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
        '@next/next/no-img-element': 'off'
    }
}, {
    ignores: ['.next/*']
}];
