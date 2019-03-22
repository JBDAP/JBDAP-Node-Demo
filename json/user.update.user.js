module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    commands: [
        {
            name: 'updateUser',
            type: 'update',
            target: 'User',
            query: {
                where: {
                    id: 8
                }
            },
            data: {
                password: ''+Number.randomBetween(200,300),
                gender: 'female'
            }
        }
    ]
}