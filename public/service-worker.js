const installEvent = () => {
    self.addEventListener("install", (event) => {
        async function onInstall() {
            return caches
                .open("static")
                .then((cache) =>
                    cache.addAll([
                        "/png/susan-wilkinson-DNCcYq71BSE-unsplash.jpg",
                        "/png/2h-media-GOrLkr-7q1U-unsplash.jpg",
                        "/magazine/daniel-bradley-y_WDEY9e6mA-unsplash.avif",
                        "/magazine/erwan-hesry-RJjY5Hpnifk-unsplash.avif",
                        "/magazine/marcos-rivas-HX_QUGNAjDo-unsplash.avif",
                        "/magazine/med-badr-chemmaoui-ZSPBhokqDMc-unsplash.avif",
                        "/magazine/nathan-dumlao-lvWw_G8tKsk-unsplash.avif",
                        "/magazine/rosebox-BFdSCxmqvYc-unsplash.avif",
                        "/svg/shopping-cart-01-red.svg",
                        "/svg/shopping-cart-01.svg",
                    ]),
                )
        }

        event.waitUntil(onInstall(event))
    })
}
installEvent()

const activateEvent = () => {
    self.addEventListener("activate", () => {
        console.log("service worker activated")
    })
}
activateEvent()

// const cacheName = "v--31134-0"

// self.addEventListener("fetch", (event) => {
//     if (event.request.mode === "navigate") {
//         event.respondWith(
//             (async function () {
//                 const normalizedUrl = new URL(event.request.url)
//                 normalizedUrl.search = ""

//                 const fetchResponseP = fetch(normalizedUrl)
//                 const fetchResponseCloneP = fetchResponseP.then((r) =>
//                     r.clone(),
//                 )

//                 event.waitUntil(
//                     (async function () {
//                         const cache = await caches.open(cacheName)
//                         await cache.put(
//                             normalizedUrl,
//                             await fetchResponseCloneP,
//                         )
//                     })(),
//                 )

//                 return (await caches.match(normalizedUrl)) || fetchResponseP
//             })(),
//         )
//     }
// })
