const webpack = require("webpack");

module.exports = function(env){

	const libName = "together";
	const plugins = [];
	let outputFile = `./dist/${libName}.js`;

	if (env && env.minified) {
		outputFile = `./dist/${libName}.min.js`;
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}));
	}

	var config = {
		context: __dirname,
		// entry is the "main" source file we want to include/import
		entry: `./${libName}.js`,
		// output tells webpack where to put the bundle it creates
		output: {
			// in the case of a "plain global browser library", this
			// will be used as the reference to our module that is
			// hung off of the window object.
			library: undefined, 
			// We want webpack to build a UMD wrapper for our module
			libraryTarget: "umd",
			// the destination file name
			filename: outputFile
		},
		plugins: plugins,
		// externals let you tell webpack about external dependencies
		// that shouldn"t be resolved by webpack.
		externals: [],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["env"]
						}
					}
				}
			]
		}
	}; // End of config

	return config;

};