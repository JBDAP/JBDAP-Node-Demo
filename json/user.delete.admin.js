module.exports = {
    security: {
        token: require('./_token').adminToken
    },
    needLogs: false,
    commands: [
        {
            name: 'deleteUser',
            type: 'delete',
            target: 'User',
            query: {
                where: {
                    id: 12
                }
            }
        }
    ]
}