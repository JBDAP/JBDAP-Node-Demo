module.exports = {
    security: {
        token: ''
    },
    needLogs: false,
    commands: [
        {
            name: 'updateUser',
            type: 'update',
            target: 'User',
            query: {
                where: {
                    id: 11
                }
            },
            data: {
                // roleId: 1,
                username: 'user' + Number.randomBetween(200,300),
                password: ''+Number.randomBetween(200,300),
                gender: 'female'
            }
        }
    ]
}