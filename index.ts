export const handler = async (event) => {
    console.log(event);

    const message = process.env.SST_LIVE ? "Hello, Live!" : "Hello, World!";

    return {
        statusCode: 200,
        body: JSON.stringify({ route: event.routeKey, status: "ok", message: message }, null, 2),
    };
};
