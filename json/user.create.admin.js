module.exports = {
    security: {
        token: require('./_token').adminToken
    },
    needLogs: false,
    commands: [
        {
            name: 'newUser',
            type: 'create',
            target: 'User',
            data: {
                roleId: 1,
                username: 'user' + Number.randomBetween(200,300),
                password: ''+Number.randomBetween(200,300),
                gender: 'male'
            }
        }
    ]
}