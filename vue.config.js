const path = require('path')

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		? `/${path.basename(process.cwd())}/`
		: '/',

	productionSourceMap: false,

	chainWebpack: config => {
		config.module
			.rule('i18n')
				.resourceQuery(/blockType=i18n/)
				.type('javascript/auto')
				.use('i18n')
					.loader('@kazupon/vue-i18n-loader')
					.end()
				.use('yaml')
					.loader('yaml-loader')
					.end()
				
		config.module
			.rule('worker')
				.test(/\.worker\.js$/,)
				.use('worker-loader')
					.loader('worker-loader')

		config.module
			.rule('media')
				.test(/\.(mp3|wav|ogg)(\?.*)?$/)
				.use('url-loader')
					.loader('url-loader')
					.tap(options => ({
						...options,
						limit: -1,
					}))
	},

	// configureWebpack: {
	// 	module: {
	// 		rules: [
	// 			{
	// 				test: /\.worker\.js$/,
	// 				use: { loader: 'worker-loader' }
	// 			},
	// 		]
	// 	}
	// }
}
