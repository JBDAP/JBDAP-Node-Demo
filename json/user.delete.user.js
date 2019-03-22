module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    commands: [
        {
            name: 'deleteUser',
            type: 'delete',
            target: 'User',
            query: {
                where: {
                    id: 8
                }
            }
        }
    ]
}