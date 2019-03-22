module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    commands: [
        {
            name: 'oneUser',
            type: 'entity',
            target: 'User',
            query: {
                where: {
                    id: 1
                }
            }
        }
    ]
}