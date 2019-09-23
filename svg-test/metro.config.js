/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      extraNodeModules: {
        "@babel/runtime": path.resolve(__dirname, "node_modules/@babel/runtime"),
        "react": path.resolve(__dirname, "node_modules/react"),
        "react-native": path.resolve(__dirname, "node_modules/react-native"),
        "prop-types": path.resolve(__dirname, "node_modules/prop-types"),
        "react-native-svg": path.resolve(__dirname, "node_modules/react-native-svg"),
      },
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    },
    projectRoot: path.resolve(__dirname),
    watchFolders: [
      path.resolve(__dirname, "../public-component")
    ]
  };
})();
