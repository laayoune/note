# Node.js REPL环境
交互式解释器，就是node命令进入的node环境

常用命令
```c
ctrl + c  //退出当前终端
ctrl + c  //按下两次,退出 Node RERL环境
ctrl + d  //脱出Node RERL,Linux下
向上\向下键  //查看输入历史
tab键  //列出当前命令
$ .help  //列出使用命令
$ .break  //退出多行表达式
$ .clear  //退出多行表达式
$ .save filename  //保存当前的Node RERL会话到指定文件
$ .load filename  //载入当前的Node RERL会话的文件内容
```

# 包管理器npm详解
#### 本地安装和全局安装
```c
-g   //全局安装
--save || -S    // 发布后还需要的依赖项,dependencies下
–save-dev || -D //开发依赖（辅助）,devDependencies下
```
#### npm的使用方法
```c
npm install  //安装
npm uninstall  //卸载
```
#### npm常用命令
```c
$ npm -v //查看版本
$ npm install npm -g //更新npm
$ npm search 包名 //返回npm中的所有相关的包
$ npm help <命令> //查看<具体命令>帮助文档,退出按Q
```