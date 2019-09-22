module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins:[
    //["@babel/plugin-proposal-decorators", { "legacy" : true }],
    ["babel-plugin-module-resolver", {
      "root": ["./src"],
      "alias": {
        "components": "./src/components",
        "config": "./src/config",
        "modules": "./src/modules",
        "test": "./src/modules/test",
        "resource": "./src/resource",
        "tools": "./src/tools"
      }
    }]
  ]
};
