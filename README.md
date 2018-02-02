# gulp_Cli构建教程

### 1.初始化npm模块
`$ npm init`


### 2.安装gulp
- 全局安装  
`$ npm install --global gulp`

- 作为项目的开发依赖（devDependencies）安装
`$ npm install --save-dev gulp`

### 3.常用API 
- gulp.src(globs[, options])  
作用：读取文件进行操作

- gulp.dest(path[, options])  
作用：重新输出所有数据

- gulp.dest(path[, options])  
作用：重新输出所有数据

- gulp.task(name[, deps], fn)  
作用：定义任务



### 4.扩展插件 
- gulp-sass
- gulp-less



### 5.how to自动创建index.html 
- 需要模块
  pug API 
  https://pug.bootcss.com/api/getting-started.html