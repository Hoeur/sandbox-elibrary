module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.tmob.me',
                changeOrigin: true,
                httpOnly:true,
                ws: true,
                secure: false,  // If your backend server doesn't use HTTPS, set this to false
            }
        },
        // Additional configuration if needed
    },
};
