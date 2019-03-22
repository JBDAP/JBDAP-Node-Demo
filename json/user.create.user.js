module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    commands: [
        {
            name: 'newUser',
            type: 'create',
            target: 'User',
            data: {
                username: 'user' + Number.randomBetween(200,300),
                password: ''+Number.randomBetween(200,300),
                gender: 'male'
            }
        }
    ]
}