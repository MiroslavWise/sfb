interface IData {
    label: string
    path: string
    icon: string
}

export const MENU_PROFILE: IData[] = [
    {
        label: "Персональные данные",
        path: "/personal-data",
        icon: "/svg/profile/user-02.svg",
    },
    {
        label: "Контактная информация",
        path: "/contact-information",
        icon: "/svg/profile/user-edit.svg",
    },
    {
        label: "Безопастность и пароль",
        path: "/security-and-password",
        icon: "/svg/profile/passcode-lock.svg",
    },
    {
        label: "Платёжная информация",
        path: "/payment-information",
        icon: "/svg/profile/credit-card-edit.svg",
    },
]
