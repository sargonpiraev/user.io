module.exports = {
	entry: './src/index.tsx',
	output: {
		path: __dirname + '/out',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.css/, loaders: [ 'style-loader', 'css-loader' ] }
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	}
}