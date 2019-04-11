/**
 * Comment 表的权限设计
 */

// 引入数据库连接
const conn = require('../../db').conn

let conn = db

module.exports = {
    name: 'Comment',
    verify: {
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
        user: 'fromUserId=$id',
        admin: true
    },
    update: {
        default: false,
        user: 'fromUserId=$id',
        admin: true
    },
    freeze: {
        // 用户更新自身数据时也不可以改动如下字段
        user: 'hearts'
    },
    delete: {
        default: false,
        // 我们假定允许 Blog 作者删除自己文章下面的 Comment
        // 由于 Comment 跟 Blog.userId 之间没有直接关联
        // 所以需要进行一些自定义验证来判断权限
        // 当然现实开发中是可以用一个冗余字段来解决的
        // 这里仅为演示自定义函数功能才这么设计
        user: async function(user,cmd,target,data){
            // 确定对 target 数据有无权限
            // 如果 Comment 是当前用户所发或者属于当前用户的 Blog，则有权限
            let yon = true
            for (let i=0; i<target.length; i++) {
                let row = target[i]
                if (row.fromUserId !== user.id) {
                    let blogId = row.blogId
                    let query = conn.select('userId').from('Blog').where('id', '=', blogId)
                    let res = await query
                    if (res.length !== 1) {
                        yon = false
                        break
                    }
                    else {
                        if (res[0].userId !== user.id) {
                            yon = false
                            break
                        }
                    }
                }
            }
            if (yon === false) throw new Error('你无权删除不属于你 Blog 的 Comment')
        },
        admin: true
    }
}
