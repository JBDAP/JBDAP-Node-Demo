const db = require('./db')

db.init().then(() => {
    console.log('数据库结构创建成功')
    db.fill().then(() => {
        console.log('测试数据填充成功')
        process.exit()
    }).catch((ex) => {
        console.log(ex)
        process.exit()
    })
}).catch((err) => {
    console.log(err.fullStack())
    process.exit()
})