// eslint.config.js
export default [
    {
        rules: {
            semi: ['error', 'always'],
            'prefer-const': 'error',
            'object-curly-spacing': ['error', 'always'],
            'block-spacing': ['error', 'always'],
            'indent': ['error', 4],
            'no-mixed-spaces-and-tabs': 'error',
            'no-tabs': 'error',
            'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }]
        }
    }
];