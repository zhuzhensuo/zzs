var htmlwebpackplugin = require('html-webpack-plugin');
var webpack = require('webpack');
var jquery = require('jquery');
var path = require('path');
var miniCssExtract = require('mini-css-extract-plugin'); 
var autoprefixer = require('autoprefixer');
var glob = require('glob');
var transferWebpackPlugin = require('transfer-webpack-plugin');
var webpackSpritesmith = require('webpack-spritesmith');

var getEntry = function(){
	var entry = {}
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
}
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
}

module.exports = {
	mode:'development',
	//devtool:'cheap-source-map',
	entry:entryObj,
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:'js/bundle.[name].js'
	},
	devServer:{
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
				},'css-loader','postcss-loader','less-loader']//postcss-loader必须放在less-loader前面
			},{
				test:/\.(jpg|jpeg|png|gif)?$/,
				use:['file-loader?limit=10000&name=images/[name].[hash:7].[ext]','image-webpack-loader?{pngquant:{quality: "55-90", speed: 4}}']
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
}
Object.keys(entryObj).forEach(function(name){
	module.exports.plugins.push(new htmlwebpackplugin(getHtmlTemplate(name)));
});