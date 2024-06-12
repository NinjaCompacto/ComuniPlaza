module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@": "./app", // Substitua './app' pelo caminho da sua pasta principal
          },
        },
      ],
    ],
  };
};
