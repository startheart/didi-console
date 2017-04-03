
didi-console
==============================
[npm version](https://www.npmjs.com/package/didi-console)

一个轻量、可拓展、针对手机网页的前端开发者调试面板。


## 特性

- 查看 console 日志
- 查看网络请求
- 手动执行 JS 命令行
- 自定义插件


## 上手

npm 安装：

```
npm install didi-console
```

引入 `dist/didiConsole.min.js` 到项目中：

```html
<script src="path/to/didiConsole.min.js"></script>
<script>
console.log('Hello world');
// 然后点击右下角 vConsole 按钮即可查看到 log
</script>
```

## 特别感谢 [vConsole](https://github.com/WechatFE/vConsole)
didi-console 扩展自 WechatFE团队开发的 [vConsole](https://github.com/WechatFE/vConsole)

## License

The MIT License (http://opensource.org/licenses/MIT)
