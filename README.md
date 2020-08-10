git commit -m "first commit"###后台管理系统

依赖包导入指令

按需打包和定制主题配置

```js

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
            modifyVars: {'@primary-color':'#000000'},
        }
    }),
);

```

前端接口统一请求头为application/json格式(axios的默认请求方式)

```text
git init 初始化
git status 查看暂存区状态
git add . 添加所有的文件到本地分支
git commit -m "123" 提交代码到本地仓库
git push [remote] [branch] 推送到指定的地址和分支的远程仓库

git remote [remote] [url] 与远程地址关联
git add remote [remote] [url] 创建远程仓库并关联
git checkout -b [branch] 新建一个分支,并切换到该分支

```
