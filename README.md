# didiConsole

## 安装

进入fis-didi项目根目录(如果没有则通过`didi init project`初始化一个)

```bash
cd <project_path>
#安装 didiConsole
# didi-component是该组件仓库所属groups，如果只不加(didi install didiConsole)默认使用 didi-component/didiConsole
didi install didi-component/didiConsole
```

## 使用

在项目任意可编写JS代码处使用

```javascript
//获取组件
var didiConsole = require('didiConsole');
//调用一些方法(someMethod只是举例)
didiConsole.someMethod();
```
