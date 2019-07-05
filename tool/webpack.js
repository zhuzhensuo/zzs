var htmlwebpackplugin = require('html-webpack-plugin');
var webpack = require('webpack');
var jquery = require('jquery');
var path = require('path');
var miniCssExtract = require('mini-css-extract-plugin'); // extract css from bundle
var autoprefixer = require('autoprefixer');// auto add css prefix
var glob = require('glob');// get the path all filename
var transferWebpackPlugin = require('transfer-webpack-plugin'); // replace copy plugin
var webpackSpritesmith = require('webpack-spritesmith');// auto build css sprites
let compressionWebpackPlugin = require('compression-webpack-plugin');//gzip compress
let uglifyJsplugin = require('uglifyJs-webpack-plugin');//compress js file
let optimizeCss = require('optimize-css-assets-webpack-plugin');//compress css file

var getEntry = function(){
	var entry = {};
	glob.sync('./js/**/*.js').forEach(function(name){
		var from = name.lastIndexOf('/') + 1;
		var to = name.lastIndexOf('.');
		var entryArr = [];
		var fileName = name.substring(from,to);
		entryArr.push(name);
		entryArr.push('babel-polyfill');
		entry[fileName] = entryArr;
		
	});
	return entry;
};
var entryObj = getEntry();

var getHtmlTemplate = function(name){
	return {
		filename:`${name}.html`,
		template:`${name}.html`,
		inject:true,
		hash:true,
		chunks:[name],
		minify:{
			removeComments:true,
			collapseWhitespace:true
		}
	}
};
module.exports = {
	mode:'development',
	//devtool:'cheap-source-map',
	optimization:{ //replace commonChunksPlugin
		splitChunks:{
			chunks:'all',
		},
		minimizer:[new optimizeCss({})]
	},
	resolve:{
		alias:{

		},
	},
	externals:{},
	entry:entryObj,
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:'js/[name].bundle.js'
	},
	devServer:{
        host: '0.0.0.0',
		port:8090,
		open:true,
		hot:true
	},
	module:{
		rules:[
			{
				test:/\.css$/i,
				use:[miniCssExtract.loader,'css-loader','postcss-loader']
			},{
				test:/\.less$/i,
				use:[{
					loader:miniCssExtract.loader,
					options:{publicPath:'../'}
				},'css-loader','postcss-loader','less-loader']//postcss-loader±ØÐë·ÅÔÚless-loaderÇ°Ãæ
			},{
				test:/\.(jpg|jpeg|png|gif)?$/,
				use:['url-loader?limit=10000&name=images/[name].[hash:7].[ext]','image-webpack-loader?{pngquant:{quality: "55-90", speed: 4}}']
			},{
				test:/\.html$/,
				use:{
					loader:'html-loader',
					options:{
						attrs:["img:src"]
					}
				}
			}
		]
	},
	plugins:[
		new webpack.ProvidePlugin({
			$:"jquery",
			jquery:"jquery",
			jQuery:"jquery",
		}),
		new miniCssExtract({
			filename:'css/style.css'
		}),
		new transferWebpackPlugin([{
			from:'static',
			to:'static'
		}]),
		new compressionWebpackPlugin({
            algorithm:'gzip',
			test:new RegExp('\\.(css|js)$'),
			threshold:10240,
			minRatio:0.8
		})
		
		new webpackSpritesmith({
			src:{
				cwd:path.resolve(__dirname,"icons"),
				glob:'*.png'
			},
			target:{
				image:'./dist/sprites/sprite.png',
				css:'./dist/sprites/sprite.css'
			},
			apiOptions:{
				cssImageRef:'./sprite.png'
			}
		})
		
	]
};
Object.keys(entryObj).forEach(function(name){
	module.exports.plugins.push(new htmlwebpackplugin(getHtmlTemplate(name)));
});
