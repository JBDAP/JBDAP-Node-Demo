/**
 * Blog 表的权限设计
 */
module.exports = {
    name: 'Blog',
    verify: {
        title: function(val) {
            // 这里可以进行敏感字符过滤
            return true
        },
        content: function(val) {
            // 这里可以进行敏感字符过滤
            return true
        }
    },
    select: {
        default: true,
        user: true,
        admin: true
    },
    create: {
        default: false,
        user: 'userId=$id',     // 只能创建自己的Blog
        admin: true
    },
    update: {
        default: false,
        user: 'userId=$id',     // 只能更新自己的Blog
        admin: true
    },
    freeze: {
        // 用户更新自身Blog时也不可以改动如下几个字段
        user: 'views,hearts'
    },
    delete: {
        default: false,
        user: 'userId=$id',     // 只能删除自己的Blog
        admin: true
    }
}
