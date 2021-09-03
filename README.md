## Features

为 Dart 类生成一个 Clone 方法，Dart 本身没有浅复制的语法，想要实现一个对象的赋值只能手动实现一个 clone 方法并赋值所有的属性，此插件可以解析 Dart 语法为你自动生成一个 clone 方法
![](https://ssbun-lot.oss-cn-beijing.aliyuncs.com/img/Kapture%202021-09-02%20at%2016.47.15.gif)

**使用方法**
在 Class 的名字上或所在行点击 `cmd` + `.`，执行 `Generate clone function` 就可以在 class 的底部生成一个 clone 方法

## Extension Settings

## Known Issues
可能是由于 antlr 官方提供的 Dart2.g4 文件没有更新，导致在解析 Dart 语法时，如果一个类的内容过于复杂，可能无法精准的判定类的结束`}`的位置，这样插入的`clone`方法位置是错的
The antlr4ts or the Dart2.g4 file has some bugs that maybe the generated code cannot be placed to correct position.

## Release Notes
### 0.0.3
为 Dart Class 生成一个 clone 方法
Can auto-generate an clone function for your dart classes

**Enjoy!**