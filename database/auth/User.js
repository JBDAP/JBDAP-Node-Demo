/**
 * User 表的权限设计
 */
module.exports = {
    name: 'User',
    prepare: {
        password: function(val) {
            // 这里自动对用户密码进行md5加密
            if (!_.isUndefined(val)) return crypto.md5(val)
            else return null
        }
    },
    verify: {
        level: ['standard','vip','prime'],
        username: function(val) {
            // 这里可以用正则来确保账号的规范性
            return true
        },
        gender: ['male','female','unknown']
    },
    select: {
        default: true,
        user: true,
        admin: true
    },
    mask: {
        default: 'password,email',
        user: 'password'
        // admin 未设定代表着无需遮掩任何字段
    },
    create: {
        default: true,
        user: false,        // 登录用户不能创建账号
        admin: true
    },
    update: {
        default: false,
        user: 'id=$id',     // 只能更新自己的数据
        admin: true
    },
    freeze: {
        // default 角色创建账号时不可自定义以下字段
        // 注意设计数据库结构时，如果以下字段不能为空则要设默认值，否则会插入失败
        default: 'level,roleId',
        // 用户更新自身数据时也不可以改动如下几个字段
        user: 'username,level,roleId'
    },
    delete: {
        default: false,
        user: 'id=$id',     // 只能删除自己的数据
        admin: true
    }
}
