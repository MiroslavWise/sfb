export const CONFIG_ENV = {
    url: process.env.NEXT_PUBLIC_URL!,
    url_api: process.env.NEXT_PUBLIC_URL_API!,
    urlGraphQL: `${process.env.NEXT_PUBLIC_URL_API}/graphql/`,
    ws: `${process.env.NEXT_PUBLIC_WEBSOCKET}/ws/notification/?token=`,
}
