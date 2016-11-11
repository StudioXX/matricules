module.exports = {
  "extends": "airbnb",
  "rules": {
    "spaced-comment": [
      "warn",
      "always", {
        "exceptions": ["/"]
      }
    ],
    "no-use-before-define": ["warn"],
    "indent": ["warn"],
    "no-unused-vars": ["warn"],
    "arrow-body-style": [
      "warn", "always"
    ],
    "react/jsx-filename-extension": [
      1, {
        "extensions": [".js", ".jsx"]
      }
    ],
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    "quotes": [
      "warn", "single"
    ],
    "quote-props": [
      "warn", "as-needed"
    ],
    "comma-dangle": [
      "warn", {
        "arrays": "never",
        "objects": "always",
        "imports": "never",
        "exports": "never",
        "functions": "ignore"
      }
    ],
    "no-lonely-if": ["warn"],
    "no-underscore-dangle": [
      2, {"allow": ["_id", "__v"]}
    ],
    "max-len": ["warn"]
  },
  "plugins": ["react", "jsx-a11y", "import"]
};