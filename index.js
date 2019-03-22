const db = require('./db')
const jbdap = require('jbdap-engine')
const helper = require('jbdap-helper')
const readline = require('readline')

let conn = db.conn

/**
 * 获取用户信息并返回
 * @param {object} security 鉴权相关数据对象
 */
async function recognizer(security) {
    let result = {
        id: 0,
        role: 'default',
        authority: null
    }
    // 如果 token 为 undefined 或者空字符串，则返回默认角色，即 'default' role
    if (_.isUndefined(security.token) || (_.isString(security.token) && security.token === '')) return result
    else {
        // 读取 token 记录
        let tokenInfo = await $exec(conn.from('JBDAP_Token').select(['userId','roleId','expiresAt']).where({
            token: security.token
        }))
        if (tokenInfo.error) $throwError('DBQueryError',tokenInfo.error,null,[
            ['zh-cn', `查询 token '${security.token}' 信息失败`],
            ['en-us', `Error occurred while querying token '${security.token}'`]
        ])
        if (_.isArray(tokenInfo.data) && tokenInfo.data.length === 0) $throwError('TokenError',tokenInfo.error,null,[
            ['zh-cn', `找不到 token '${security.token}'`],
            ['en-us', `Token '${security.token}' can't be found`]
        ])
        if (tokenInfo.data.length === 1) result.id = tokenInfo.data[0].userId
        else $throwError('DBQueryError',tokenInfo.error,null,[
            ['zh-cn', `无法正确读取 token '${security.token}' 的信息`],
            ['en-us', `Infomation of token '${security.token}' is not right`]
        ])
        // 查询角色信息
        let roleInfo = await $exec(conn.select(['name','authority']).from('JBDAP_Role').where({id: tokenInfo.data[0].roleId}))
        if (roleInfo.error) $throwError('DBQueryError',tokenInfo.error,null,[
            ['zh-cn', `查询用户角色权限信息失败`],
            ['en-us', `Failed to query user's role infomation`]
        ])
        if (roleInfo.data.length === 1) {
            // 查询成功
            result.role = roleInfo.data[0].name
            result.authority = JSON.parse(roleInfo.data[0].authority)
        }
        else $throwError('DBQueryError',tokenInfo.error,null,[
            ['zh-cn', `查询用户角色权限信息失败`],
            ['en-us', `Failed to query user's role infomation`]
        ])
        return result
    }
}

/**
 * 自己实现的敏感数据扫描器，用于数据返回前检查敏感数据
 * @param {object} user 即 recognizer 获取到的用户信息
 * @param {cmd} cmd 原始 JBDAP 指令
 * @param {array} fields 查询指令解析出的字段数组
 * @param {array} data 要扫描的数据列表
 */
function scanner(user,cmd,fields,data) {
    // 这里将敏感数据定义在了 auth 配置文件里
    let configs = require('./database/auth/' + cmd.target)
    try {
        // 借助 jbdap-helper 工具实现自动扫描
        return helper.scan(configs,user,fields,data)
    }
    catch (err) {
        // 将错误抛出可以附加到 JBDAP 的完整错误信息链
        throw err
    }
}

/**
 * 自己实现的权限控制器，用于检查每一个 JBDAP 指令是否被授权
 * @param {object} user 即 recognizer 获取到的用户信息
 * @param {cmd} cmd 原始 JBDAP 指令
 * @param {array} target 当前操作指令涉及的数据
 */
async function doorman(user,cmd,target) {
    // 用户对数据的操作权限也写在 auth 配置文件里
    let configs = require('./database/auth/' + cmd.target)
    try {
        // 借助 jbdap-helper 工具实现自动鉴权
        return await helper.check(configs,user,cmd,target)
    }
    catch (err) {
        // 将错误抛出可以附加到 JBDAP 的完整错误信息链
        throw err
    }
}

let config = {
    recognizer,
    doorman,
    scanner,
    language: 'zh-cn'
}

// 命令行式的交互，输入 json 文件名，执行相应的任务
const read = readline.createInterface(process.stdin, process.stdout)
read.setPrompt('请输入要执行的脚本名称 > ')
read.prompt()
read.on('line', async function(line) {
    if (line.trim() === 'exit') read.close()
    try {
        let json = require('./json/' + line.trim() + '.js')
        let res = await jbdap.manipulate(conn,json,config)
        if (!res.trace) console.log(JSON.stringify(res,null,4))
        else console.log(res.trace)
        read.prompt()
    }
    catch (err) {
        if (err.toString().indexOf('Cannot find module') >= 0) {
            console.log('脚本名称输入错误！')
            read.prompt()
        }
    }
});

read.on('close', function() {
    process.exit()
});
