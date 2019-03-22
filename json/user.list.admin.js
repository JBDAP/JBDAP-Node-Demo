module.exports = {
    security: {
        token: require('./_token').adminToken
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