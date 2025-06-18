import localFont from 'next/font/local';

export const sfPro = localFont({
    src: [
        {
            path: '../public/fonts/SF-Pro-Display-Regular.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../public/fonts/SF-Pro-Display-Medium.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../public/fonts/SF-Pro-Display-Bold.otf',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-sf-pro'
});
