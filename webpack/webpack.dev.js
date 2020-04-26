let merge = require('webpack-merge'),
	config = require('./webpack.config.js'),
	webpack = require('webpack');
module.exports = merge(config,{
	mode:'development',
	devServer:{
		host:'0.0.0.0',
		port:'9527',
		inline:true,
		hot:true,
		proxy:{
			'/xwa':{
				changeOrigin:true,
				target:'http://localhost:9528',
				pathRewrite:{'^/xwa':'/'}
			}
		}
	},
	module:{
		
	},

	plugins:[
		new webpack.ProvidePlugin({
			$:"jquery",
			jquery:"jquery",
			jQuery:"jquery",
		}),
		new webpack.DefinePlugin({
			"process.env":{
				"MODE":'"development"',
				"NAME":'"'+ process.env.MYNAME +'"'
			}
			
		})
	]
});