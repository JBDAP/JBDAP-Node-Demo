/**
 * Comment 表结构设计
 */
module.exports = {
    name: 'Comment',
    columns: [
        {
            name: 'id',
            type: 'increments',
            primary: true
        },
        {
            name: 'blogId',
            type: 'integer',
            notNullable: true,
            unsigned: true
        },
        {
            name: 'fromUserId',
            type: 'integer',
            notNullable: true,
            unsigned: true
        },
        {
            name: 'content',
            type: 'text',
            notNullable: true
        },
        {
            name: 'hearts',
            type: 'integer',
            notNullable: true,
            unsigned: true,
            defaultTo: 0
        }
    ],
    indexes: [
        ['blogId'],
        ['fromUserId']
    ],
    foreignKeys: [
        {
            selfColumn: 'blogId',
            targetTable: 'Blog',
            targetColumn: 'id'
        },
        {
            selfColumn: 'fromUserId',
            targetTable: 'User',
            targetColumn: 'id'
        }
    ]
}