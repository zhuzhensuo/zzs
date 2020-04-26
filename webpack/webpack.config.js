let glob = require('glob'),
	path = require('path'),
	htmlWebpackPlugin = require('html-webpack-plugin'),
	miniCssExtractPlugin = require('mini-css-extract-plugin'),
	webpack = require('webpack'),
	autoprefixer = require('autoprefixer');
function getEntryObj(){
	let entryObj = {};
	glob.sync('./js/*.js').forEach(v => {
			let start = v.lastIndexOf('/'),
			end = v.lastIndexOf('.'),
			name = v.substring(start + 1,end);
		entryObj[name] = './js/' + name + '.js';
	});
	return entryObj;
}
let entrysObj = getEntryObj();
module.exports = {
	resolve:{
		alias:{
			'vue':'vue/dist/vue.min.js'
		}
	},
	entry:entrysObj,
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name].js'
	},
	module:{
		rules:[{
			test:/\.js$/i,
			use:{
				loader:'babel-loader',
				options:{
					presets:[
						'@babel/preset-env'
                    ]
				}
			}
		},{
			test:/\.css$/i,
			use:['style-loader',{
				loader:miniCssExtractPlugin.loader,
				options:{
					publicPath:'../'
				}
			},'css-loader','postcss-loader']
		},{
			test:/\.less$/i,
			use:['style-loader',{
				loader:miniCssExtractPlugin.loader,
				options:{
					publicPath:'../'
				}
			},'css-loader','postcss-loader','less-loader']
		},{
			test:/\.(png|jpg|jpeg|gif|bpm)$/i,
			//url-loader sometimes has problem, if it won't work, use file-loader replace it
			use:['url-loader?limit=10000&name=images/[name]-[hash:6].[ext]',{
				loader:'image-webpack-loader',
				options:{
					pngquant:{
						quality:[0.3,0.5],
						speed:4
					}
					
				}
			}]
		},{
			test:/\.html$/i,
			use:'html-url-loader' //use html-url-loader replace html-loader
		}]
	},
	plugins:[
		new miniCssExtractPlugin({
			filename:'css/[name].css'
		}),
	]
};
Object.keys(entrysObj).forEach(v => {
	module.exports.plugins.push(new htmlWebpackPlugin({
		template:v + '.html',
		filename:v + '.html',
		chunks:[v],
		inject:true,
		hash:true,
		minify:{
			collapseWhitespace:true
		},
		cdn: {
			css:[],
			js: ['https://code.jquery.com/jquery-3.4.1.js']
		}
	}));
});