module.exports = {
    security: {
        token: ''
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