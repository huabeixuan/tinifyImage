const tinify = require('tinify');
const tinifyKey = require('./tinifyKey')
tinify.key = tinifyKey;

const fs = require('fs');
const path = require('path'); //解析需要遍历的文件夹
let argv = require('yargs').argv;
const filePath = path.resolve(argv.dir);
console.log('压缩路径图片目录：',filePath)

function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            let isFile = stats.isFile(); //是文件
            let isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              if(/png$/.test(filedir)) {
                compressImg(filedir) // 读取文件内容
              }
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

compressImg = (fileDir) => {
  const source = tinify.fromFile(fileDir);
  source.toFile(fileDir);
}


fileDisplay(filePath);
