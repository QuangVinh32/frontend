const CracoAliasPlugin = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: "options",
        baseUrl: "/",
        aliases: {
          "crypto": "crypto-browserify",
        },
      },
    },
  ],
};
