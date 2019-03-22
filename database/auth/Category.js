/**
 * Category 表的权限设计
 */
module.exports = {
    name: 'Category',
    select: {
        default: true,
        user: true,
        admin: true
    },
    create: {
        default: false,
        user: false,
        admin: true
    },
    update: {
        default: false,
        user: false,
        admin: true
    },
    delete: {
        default: false,
        user: false,
        admin: true
    }
}
