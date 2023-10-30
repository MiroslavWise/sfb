export const DELIVERY_TYPE: IDeliveryType[] = [
    {
        label: "Доставка SFB",
        value: "sfb-delivery",
    },
    {
        label: "Самовывоз",
        value: "self-delivery",
    },
    {
        label: "За счет покупателя",
        value: "buyer-expense",
    },
]

export type TTypeDelivery = "sfb-delivery" | "self-delivery" | "buyer-expense"

export interface IDeliveryType {
    label: string
    value: TTypeDelivery
}
