const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.extraNodeModules = {
  "@": `${__dirname}/app`, // Substitua './app' pelo caminho da sua pasta principal, se necessário
};
module.exports = defaultConfig;
