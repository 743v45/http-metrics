PATH  := node_modules/.bin:$(PATH)


clean:
	@rm -rf node_modules

install:
	@npm install --registry=http://registry.npm.taobao.org/

test: install
	@NODE_DEV=test mocha

test-cov: install
	NODE_DEV=test istanbul cover node_modules/mocha/bin/_mocha

lint: install
	@gulp

.PHONY: test clean install lint
