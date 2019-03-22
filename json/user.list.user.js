module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    commands: [
        {
            name: 'allUsers',
            type: 'list',
            target: 'User',
            query: {
                order: 'id#desc'
            }
        }
    ]
}