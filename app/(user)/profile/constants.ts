export const ITEMS_PROFILE: IItemsProfile[] = [
    {
        icon: "/svg/profile/user-edit.svg",
        label: "Изменить контактные данные",
        value: "/change-data",
    },
    {
        icon: "/svg/profile/passcode-lock.svg",
        label: "Изменить пароль",
        value: "/change-password",
    },
    {
        icon: "/svg/profile/credit-card-edit.svg",
        label: "Изменить платежные данные",
        value: "/change-payment",
    },
    // {
    //     icon: "/svg/profile/trash-03.svg",
    //     label: "Удалить аккаунт",
    //     value: "/delete-account",
    // },
]

export interface IItemsProfile {
    icon: string
    label: string
    value: string
}
