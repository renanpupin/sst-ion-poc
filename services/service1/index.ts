import {Resource} from 'sst'
import {SNSClient, PublishCommand} from '@aws-sdk/client-sns'
const client = new SNSClient()

export const handler = async event => {
    console.log(event)

    const message = `Hello, from service 1! (${process.env.SST_LIVE ? 'live' : 'not live'})`

    return {
        statusCode: 200,
        body: JSON.stringify({route: event.routeKey, status: 'ok', message: message}, null, 2)
    }
}

export const publisher = async event => {
    await client.send(
        new PublishCommand({
            TargetArn: Resource.MyTopic.arn,
            Message: JSON.stringify({foo: 'bar'}),
            MessageAttributes: {foo: {DataType: 'String', StringValue: 'bar'}}
        })
    )

    return {
        statusCode: 200,
        body: JSON.stringify({status: 'sent'}, null, 2)
    }
}

export const subscriber = async event => {
    console.log('subscriber', event)
    return 'ok'
}
