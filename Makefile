

lint : 
	npx eslint .

develop :
	npm run webpack-serve

build :
	    rm -rf dist
	    NODE_ENV=production npm run webpack 
publish :
	npm publish