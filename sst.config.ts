/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: 'my-ts-app',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws'
        }
    },
    async run() {
        const topic = new sst.aws.SnsTopic('MySnsTopic')
        topic.subscribe('services/service1/index.subscriber')

        // const publisherApp = new sst.aws.Function('Publisher', {
        //     handler: 'services/service1/index.publisher',
        //     link: [topic],
        //     url: true
        // })

        const apiGatewayApp = new sst.aws.ApiGatewayV2('MyApi')
            .route('GET /', 'services/service1/index.handler')
            .route('GET /publisher', {
                handler: 'services/service1/index.publisher',
                link: [topic] //this is not working
            })
            .route('GET /service2', 'services/service2/index.handler')

        return {
            // app: publisherApp.url,
            apiGatewayApp: apiGatewayApp.url,
            topic: topic.name
        }
    }
})
