export const ITEM_CAROUSEL_BANNER: IItemCarouselBanner[] = [
    {
        value: "1",
        img: {
            src: "/png/banner-carousel.png",
            alt: "banner-carousel",
        },
        label: "Скачай мобильное приложения прямо сейчас!",
        color: "var(--main-red)",
    },
    {
        value: "2",
        img: {
            src: "/png/banner-carousel.png",
            alt: "banner-carousel",
        },
        label: "Скачай мобильное приложения прямо сейчас!",
        color: "var(--main-purple)",
    },
    {
        value: "3",
        img: {
            src: "/png/banner-carousel.png",
            alt: "banner-carousel",
        },
        label: "Скачай мобильное приложения прямо сейчас!",
        color: "var(--main-yellow)",
    },
    {
        value: "4",
        img: {
            src: "/png/banner-carousel.png",
            alt: "banner-carousel",
        },
        label: "Скачай мобильное приложения прямо сейчас!",
        color: "var(--main-black)",
    },
]

export interface IItemCarouselBanner {
    value: string
    img: {
        src: string
        alt: string
    }
    label: string
    color: string
}
