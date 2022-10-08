import pluginTester from 'babel-plugin-tester';
import plugin from '../src/index';

pluginTester({
    plugin,
    pluginName: 'babel-plugin-type-generator',
    fixtures: `${__dirname}/fixtures`,
    babelOptions: {
        plugins: [
            '@babel/plugin-syntax-typescript',
        ],
    },
    filename: 'somefils.ts',
});
