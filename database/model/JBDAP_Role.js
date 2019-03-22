/**
 * JBDAP_Role 系统角色表
 * 以 JBDAP_ 开头的数据表为 JBDAP 系统表，无法被 JBDAP 请求访问到
 * 只能后端开发人员自己写代码来进行访问
 */
module.exports = {
    name: 'JBDAP_Role',
    columns: [
        {
            name: 'id',
            type: 'increments',
            primary: true
        },
        {
            name: 'name',
            type: 'string',
            length: 100,
            notNullable: true
        },
        {
            name: 'authority',
            type: 'text'
        }
    ],
    unique: [
        'name'
    ]
}