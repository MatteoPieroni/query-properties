import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";
export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            file: `dist/${pkg.main}`,
            format: 'cjs'
        },
        {
            file: `dist/${pkg.module}`,
            format: 'es' // the preferred format
        },
        {
            file: `dist/${pkg.browser}`,
            format: 'iife',
            name: 'queryProperties' // the global which can be used in a browser
        }
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        terser() // minifies generated bundles
    ]
};