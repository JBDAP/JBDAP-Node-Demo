module.exports = {
    security: {
        token: ''
    },
    needLogs: false,
    commands: [
        {
            name: 'newBlog',
            type: 'create',
            target: 'Blog',
            data: {
                categoryId: 2,
                userId: 1,
                title: 'blog title ' + Number.randomBetween(200,300),
                content: 'blog content '+Number.randomBetween(200,300)
            }
        }
    ]
}