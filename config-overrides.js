
const {override,fixBabelImports,addLessLoader} = require('customize-cra');

module.exports= override(
    //针对antd实现按需打包: 根据import按需打包
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    //自定义主题 对less的变量进行重新指定
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            //1DA57A
            modifyVars: {'@primary-color':'#1DA57A'},
        }
    }),
);
