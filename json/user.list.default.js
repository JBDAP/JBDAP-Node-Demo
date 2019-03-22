module.exports = {
    security: {
        token: ''
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