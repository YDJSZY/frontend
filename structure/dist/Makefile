SRC = $(shell find src -name '*.js')
LIB = $(SRC:src/%.js=scripts/%.js)

lib: $(LIB)
scripts/%.js: src/%.js
	mkdir -p $(@D)
	../../kuaiyunapp/node_modules/.bin/babel $< -o $@
