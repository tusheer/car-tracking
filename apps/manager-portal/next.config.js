const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
      API_URL: process.env.NEXT_PUBLIC_API_URL,
      HOST_URL :process.env.NEXT_PUBLIC_HOST_URL
  },
});
