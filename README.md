# Installation

```
npm install
```

# Generate data

```
node patient_gen.js > data.json
```

# Output SVG's

SVG Template files are constructed using the [mustache](https://github.com/janl/mustache.js/) templating syntax.

```
mkdir ./out
node ./bin/index.js ./data.json ./template.svg ./out
```