const glob = require('glob')
const path = require('path')

let modelFiles = glob.sync(path.join(__dirname, '*.js'))
let models = []
modelFiles.forEach((file) => {
    // 排除掉_开头的非标准model文件
    if (file.replace(__dirname,'').replace('JBDAP_','').indexOf("_") < 0) {
        let model = require(file)
        models.push(model)
    }
})

module.exports = models