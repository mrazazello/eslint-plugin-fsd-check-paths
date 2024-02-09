# eslint-plugin-fsd-plugin

Check import paths for FSD structure

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-check-paths`:

```sh
npm install eslint-plugin-fsd-check-paths --save-dev
```

## Usage

Add `fsd-check-paths` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-check-paths"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-check-paths/path-checker": "error"
    }
}
```


