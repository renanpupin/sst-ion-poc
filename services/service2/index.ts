import {getCurrentDate} from "@packages/date";

export const handler = async (event) => {
    console.log(event);

    const message = getCurrentDate().toString();

    return {
        statusCode: 200,
        body: JSON.stringify({ route: event.routeKey, status: "ok", message: message }, null, 2),
    };
};
