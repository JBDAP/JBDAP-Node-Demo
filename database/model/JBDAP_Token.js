/**
 * JBDAP_Token 表
 * 以 JBDAP_ 开头的数据表为 JBDAP 系统表，无法被 JBDAP 请求访问到
 * 只能后端开发人员自己写代码来进行访问
 */
module.exports = {
    name: 'JBDAP_Token',
    columns: [
        {
            name: 'token',
            type: 'string',
            length: 100,
            primary: true
        },
        {
            name: 'userId',
            type: 'integer',
            notNullable: true,
            unsigned: true
        },
        {
            name: 'roleId',
            type: 'integer',
            notNullable: true,
            unsigned: true
        },
        {
            name: 'expiresAt',
            type: 'datetime'
        },
        {
            name: 'createdAt',
            type: 'datetime'
        },
        {
            name: 'updatedAt',
            type: 'datetime'
        }
    ],
    unique: [
        'token'
    ],
    foreignKeys: [
        {
            selfColumn: 'userId',
            targetTable: 'User',
            targetColumn: 'id'
        },
        {
            selfColumn: 'roleId',
            targetTable: 'JBDAP_Role',
            targetColumn: 'id'
        }
    ]
}