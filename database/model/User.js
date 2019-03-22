/**
 * User 表结构设计
 */
module.exports = {
    name: 'User',
    columns: [
        {
            name: 'id',
            type: 'increments',
            primary: true
        },
        {
            name: 'roleId',
            type: 'integer',
            notNullable: true,
            unsigned: true,
            defaultTo: 1
        },
        {
            name: 'level',
            type: 'string',
            length: 100,
            notNullable: true,
            defaultTo: 'standard'
        },
        {
            name: 'username',
            type: 'string',
            length: 100,
            notNullable: true
        },
        {
            name: 'password',
            type: 'string',
            length: 100,
            notNullable: true
        },
        {
            name: 'gender',
            type: 'string',
            length: 10,
            defaultTo: 'male'
        },
        {
            name: 'email',
            type: 'string',
            length: 150
        }
    ],
    unique: [
        'username'
    ],
    indexes: [
        ['level'],
        ['username']
    ],
    foreignKeys: [
        {
            selfColumn: 'roleId',
            targetTable: 'JBDAP_Role',
            targetColumn: 'id'
        }
    ]
}