# webpack_demo

a webpack3 scaffold

## 构建方式

提供三种构建方式，用于不同开发场景

+ npm run dev 开发
  - 生成一个web服务器，开启实时热更新。

+ npm run test 测试
  - 使用了 `--watch` 参数，实现开发时资源的增量更新输出。

+ npm run build 线上
  - 资源压缩
  - 静态资源可选择带上 hash 戳值
  - 多页面提取公共静态资源

## 使用 webpack 进行开发

+ 热替换实时刷新
+ 允许错误不打断程序
+ 实时语法检测

## 使用 webpack 打包可实现功能点

一个页面一个入口文件。

针对各类资源模块，可实现下列功能：

### CSS

+ 可选内联 CSS 或者单独抽离 CSS 文件
+ CSS 文件合并、压缩
+ 使用 sass-loader，可使用 sass 语法
+ 可配置 postcss，自动添加前缀（autoprefixer）
+ 打包生成的 css 样式文件可选添加 hash 戳值

### images
+ 压缩
+ 可设定引用图片大小的阈值，小于这个阈值大小的图片将编码成 base64 
+ 引用图片时添加图片的 hash 值

### javascript
+ 合并、压缩
+ ES6语法（babel-loader）
+ eslint（代码检测），可自定义检测 rules
+ 打包生成的 js 样式文件可选添加 hash 戳值

### html
+ 美化压缩，可选删除注释、空白符与换行
