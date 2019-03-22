module.exports = {
    security: {
        token: ''
    },
    needLogs: false,
    commands: [
        {
            name: 'userInfo',
            type: 'entity',
            target: 'User',
            query: {
                where: {
                    id: 1
                }
            },
            fields: [
                '*',
                {
                    name: 'top5blogs',
                    type: 'list',
                    target: 'Blog',
                    query: {
                        where: {
                            userId: '$.id'
                        },
                        order: 'updatedAt#desc',
                        size: 5
                    }
                }
            ]
        }
    ]
}