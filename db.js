const JBDAP = require('jbdap-engine')
const Helper = require('jbdap-helper')
const tables = require('./database/model/_models')

// 直接使用 JBDAP 自带的 knex
let conn = JBDAP.knex({
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/demo.sqlite'
    },
    useNullAsDefault: true,
    asyncStackTraces: true,
    debug: false
})

let init = async function() {
    let done = await conn.schema.hasTable('JBDAP_tables_done')
    if (done === false) {
        await Helper.createTables(conn,tables)
        // 创建一个特殊表来标记创建完成
        let finished = {
            name: 'JBDAP_tables_done',
            columns: [
                {
                    name: 'content',
                    type: 'string',
                    length: 100
                }
            ]
        }
        await Helper.createTable(conn,finished)
    }
}

let fill = async function() {
    let res = await conn.from('User').count('id as count')
    if (res[0].count === 0) {
        console.log('- 开始填充 [Role] 表')
        await conn('JBDAP_Role').insert([
            {
                name: 'user',
                authority: '{}',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                name: 'admin',
                authority: '{}',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ])
        //
        console.log('- 开始填充 [User] 表')
        let users = []
        for (let i=1; i<=10; i++) {
            let rdm = Number.randomBetween(1,10)
            users.push({
                roleId: rdm < 8 ? 1 : 2,
                username: 'user' + i,
                password: 'password' + i,
                gender: Math.round(i/2) === (i/2) ? 'male' : 'female',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        }
        await conn('User').insert(users)
        //
        console.log('- 开始填充 [Category] 表')
        await conn('Category').insert([
            {
                sequence: 2,
                name: '经济',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                sequence: 1,
                name: '政治',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                sequence: 3,
                name: '军事',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
        ])
        //
        console.log('- 开始填充 [Blog] 表')
        let blogs = []
        for (let i=1; i<=100; i++) {
            let rdm = Number.randomBetween(1,10)
            blogs.push({
                userId: rdm,
                categoryId: Number.randomBetween(1,3),
                title: 'blog' + i,
                content: 'blog content ' + i + ' from user ' + rdm,
                views: Number.randomBetween(1,1000),
                hearts: Number.randomBetween(1,100),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        }
        await conn('Blog').insert(blogs)
        //
        console.log('- 开始填充 [Comment] 表')
        let comments = []
        for (let i=1; i<=1000; i++) {
            let rdm = Number.randomBetween(1,100)
            comments.push({
                blogId: rdm,
                fromUserId: Number.randomBetween(1,10),
                content: 'comment ' + i + ' for blog ' + rdm,
                hearts: Number.randomBetween(1,100),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        }
        await conn.batchInsert('Comment', comments, 100)
        //
        console.log('- 开始填充 [JBDAP_Token] 表')
        let tokens = []
        for (let i=0; i<10; i++) {
            tokens.push({
                token: crypto.sha256(Math.random().toString()),
                userId: Number.randomBetween(1,10),
                roleId: Number.randomBetween(1,2),
                expiresAt: new Date().addDays(365).toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        }
        await conn('JBDAP_Token').insert(tokens)
    }
}

export { conn, init, fill}