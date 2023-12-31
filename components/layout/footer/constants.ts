export const LINKS_SOCIAL: ILinksSocial[] = [
    {
        src: "/svg/fb.svg",
        alt: "fb",
        path: "https://www.facebook.com/",
    },
    {
        src: "/svg/twitter.svg",
        alt: "twitter",
        path: "https://twitter.com/",
    },
]

interface ILinksSocial {
    src: string
    alt: string
    path: string
}

export const LINKS_SECTION_FOOTER: ILinksSectionFooter[] = [
    {
        title: "Покупателям",
        value: "",
        links: [
            {
                label: "Команда",
                value: "",
            },
            {
                label: "Для прессы",
                value: "",
            },
            {
                label: "Блог",
                value: "",
            },
            {
                label: "Вакансии",
                value: "",
            },
        ],
    },
    {
        title: "Продавцам",
        value: "",
        links: [
            {
                label: "Команда",
                value: "",
            },
            {
                label: "Для прессы",
                value: "",
            },
            {
                label: "Блог",
                value: "",
            },
            {
                label: "Вакансии",
                value: "",
            },
        ],
    },
    {
        title: "О нас",
        value: "/about",
        links: [
            {
                label: "FAQ",
                value: "/faq",
            },
            {
                label: "Контакты",
                value: "/contacts",
            },
            {
                label: "Безопасность",
                value: "/safety",
            },
            {
                label: "Вакансии",
                value: "/vacancies",
            },
        ],
    },
]

interface ILinksSectionFooter {
    title: string
    value: string
    links: {
        label: string
        value: string
    }[]
}
