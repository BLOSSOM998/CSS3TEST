function getFileList() {
    this.fs = require("fs");
    //path模块，可以生产相对和绝对路径
    this.path = require("path");
    this.pug = require('pug');
    this.remotePath = "html/";
}

getFileList.prototype = {
    renderPug: function () {
        var filePath = this.path.resolve('src', 'html');
        var remotePath = "html/";
        var fileArr = [];

        that = this;
        this.fs.readdir(filePath, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            files.forEach(function (filename) {
                var obj = {};
                //console.log(filename)
                var newUrl = remotePath + filename;
                obj.url = newUrl;
                obj.name = filename.split('.')[0];
                fileArr.push(obj);
            });
            //console.log('fileArr:'+fileArr);
            const compiledFunction = that.pug.compileFile('./list.pug', {pretty: true});
            var htmlStr = compiledFunction({
                list: fileArr
            });

            that.fs.writeFile('./dev/index.html', htmlStr, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            })
        });
    }
};

module.exports = getFileList;