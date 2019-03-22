/**
 * Blog 表结构设计
 */
module.exports = {
    name: 'Blog',
    columns: [
        {
            name: 'id',
            type: 'increments',
            primary: true
        },
        {
            name: 'categoryId',
            type: 'integer',
            notNullable: true,
            unsigned: true
        },
        {
            name: 'userId',
            type: 'integer',
            notNullable: true,
            unsigned: true
        },
        {
            name: 'title',
            type: 'string',
            length: 200,
            notNullable: true
        },
        {
            name: 'content',
            type: 'text',
            notNullable: true
        },
        {
            name: 'views',
            type: 'integer',
            notNullable: true,
            unsigned: true,
            defaultTo: 0
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
        ['categoryId'],
        ['userId']
    ],
    foreignKeys: [
        {
            selfColumn: 'categoryId',
            targetTable: 'Category',
            targetColumn: 'id'
        },
        {
            selfColumn: 'userId',
            targetTable: 'User',
            targetColumn: 'id'
        }
    ]
}