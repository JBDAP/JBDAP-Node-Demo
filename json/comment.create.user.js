module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    needTrace: false,
    commands: [
        {
            name: 'newComment',
            type: 'create',
            target: 'Comment',
            data: {
                blogId: 99,
                fromUserId: 7,
                content: 'comment content '+Number.randomBetween(200,300)
            }
        }
    ]
}