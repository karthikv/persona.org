test:
	node $(shipyard_bin) test --dir ./public/javascripts/apps
#	@./node_modules/.bin/mocha

shipyard_bin = ./public/javascripts/lib/shipyard/bin/shipyard

shipyard: shipyard_apps

shipyard_apps:
	node $(shipyard_bin) build --dir ./public/javascripts/apps

.PHONY: test shipyard
