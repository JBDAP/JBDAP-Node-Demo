module.exports = {
    security: {
        token: require('./_token').adminToken
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