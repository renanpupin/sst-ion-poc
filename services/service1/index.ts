export const handler = async (event) => {
    console.log(event);

    const message = `Hello, from service 1! (${process.env.SST_LIVE ? 'live' : 'not live'})`

    return {
        statusCode: 200,
        body: JSON.stringify({ route: event.routeKey, status: "ok", message: message }, null, 2),
    };
};
