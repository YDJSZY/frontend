SRC = $(shell find src -name '*.js')
LIB = $(SRC:src/%.js=dist/scripts/%.js)

lib: $(LIB)
dist/scripts/%.js: src/%.js
	mkdir -p $(@D)
	../kuaiyunapp/node_modules/.bin/babel $< -o $@
