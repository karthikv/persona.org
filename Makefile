shipyard_bin = ./public/javascripts/lib/shipyard/bin/shipyard
apps_dir = ./public/javascripts/apps
build_shipyard_apps = node $(shipyard_bin) build --dir $(apps_dir)

test:
	node $(shipyard_bin) test --dir $(apps_dir)
#	@./node_modules/.bin/mocha

# This combins and *minifies* all Shipyard directories.
shipyard: shipyard-apps

shipyard-apps:
	$(build_shipyard_apps) --minify

# This simply combines, without minification.
shipyard-dev: shipyard-apps-dev

shipyard-apps-dev:
	$(build_shipyard_apps)

.PHONY: test shipyard shipyard_apps
