// This module exports an object with a single property called "plugins".
// The "plugins" property is an object that contains two plugins:
// 1. "tailwindcss": This plugin is used for utilities-first CSS framework. It allows you to quickly and easily build custom designs with a low-level, flexible set of utility classes.
// 2. "autoprefixer": This plugin is used to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended to use this plugin in conjunction with tailwindcss to ensure maximum browser compatibility.

module.exports = {
  plugins: {
    tailwindcss: {}, // Object for tailwindcss plugin configuration
    autoprefixer: {}, // Object for autoprefixer plugin configuration
  },
}
