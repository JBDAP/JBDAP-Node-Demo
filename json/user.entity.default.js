module.exports = {
    security: {
        token: ''
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