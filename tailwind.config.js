module.exports = {
    darkMode: 'media',
    content: [
        './src/pages/!**!/!*.{js,ts,jsx,tsx,mdx}',
        './src/components/!**!/!*.{js,ts,jsx,tsx,mdx}',
        './src/app/!**!/!*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                serif: ['var(--font-serif)'],
                mono: ['var(--font-mono']
            },
            saturate: {
                25: '.25',
                75: '.75'
            }
        }
    },
    plugins: []
}