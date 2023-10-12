export const ITEMS_PROFILE: IItemsProfile[] = [
    {
        icon: "/svg/profile/change.svg",
        label: "Изменить контактные данные",
        value: "/change-data",
    },
    { 
        icon: "/svg/profile/key.svg",
        label: "Изменить пароль",
        value: "/change-password",
    },
    {
        icon: "/svg/profile/wallet.svg",
        label: "Изменить платежные данные",
        value: "/change-payment",
    },
    {
        icon: "/svg/profile/trash.svg",
        label: "Удалить аккаунт",
        value: "/delete-account",
    },
]

export interface IItemsProfile {
    icon: string
    label: string
    value: string
}
