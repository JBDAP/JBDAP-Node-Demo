/**
 * Category 表结构设计
 */
module.exports = {
    name: 'Category',
    columns: [
        {
            name: 'id',
            type: 'increments',
            primary: true
        },
        {
            name: 'name',
            type: 'string',
            length: 20,
            notNullable: true
        },
        {
            name: 'sequence',
            type: 'integer',
            notNullable: true,
            unsigned: true,
            defaultTo: 0
        }
    ],
    unique: [
        'name'
    ]
}