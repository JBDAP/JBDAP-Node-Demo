module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    needTrace: true,
    commands: [
        {
            name: 'delComment',
            type: 'delete',
            target: 'Comment',
            query: {
                where: {
                    id: 45
                }
            }
        }
    ]
}