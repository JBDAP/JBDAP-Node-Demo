module.exports = {
    security: {
        token: require('./_token').userToken
    },
    needLogs: false,
    commands: [
        {
            name: 'newBlog',
            type: 'create',
            target: 'Blog',
            data: {
                categoryId: 2,
                userId: 8,
                title: 'blog title ' + Number.randomBetween(200,300),
                content: 'blog content '+Number.randomBetween(200,300)
            }
        }
    ]
}