export const ITEMS_ASIDE_LEFT_PICTURE = (
    values: IValuesData,
): IItemsAsideLeft[] =>
    values.isCommercial
        ? [
              {
                  value: "/my-shop",
                  label: "Мои магазины",
                  icon: "/magazine/marcos-rivas-HX_QUGNAjDo-unsplash.jpg",
                  count: null,
              },
              {
                  value: "/my-requests",
                  label: "Мои запросы",
                  icon: "/magazine/med-badr-chemmaoui-ZSPBhokqDMc-unsplash.jpg",
                  count: values?.countMyRequests || 0,
              },
              {
                  value: "/my-sales",
                  label: "Оплаты запросов",
                  icon: "/magazine/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg",
                  count: null,
              },
              {
                  value: "/delivery",
                  label: "Доставка запросов",
                  icon: "/magazine/rosebox-BFdSCxmqvYc-unsplash.jpg",
                  count: null,
              },
          ]
        : [
              {
                  value: "/my-requests",
                  label: "Мои запросы",
                  icon: "/magazine/med-badr-chemmaoui-ZSPBhokqDMc-unsplash.jpg",
                  count: values?.countMyRequests || 0,
              },
              {
                  value: "/my-products",
                  label: "Мои товары",
                  icon: "/magazine/erwan-hesry-RJjY5Hpnifk-unsplash.jpg",
                  count: values?.countMyProducts || 0,
              },
              {
                  value: "/delivery",
                  label: "Доставка",
                  icon: "/magazine/rosebox-BFdSCxmqvYc-unsplash.jpg",
                  count: null,
              },
              {
                  value: "/my-sales",
                  label: "Мои продажи",
                  icon: "/magazine/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg",
                  count: null,
              },
              {
                  value: "/my-orders",
                  label: "Мои заказы",
                  icon: "/magazine/daniel-bradley-y_WDEY9e6mA-unsplash.jpg",
                  count: null,
              },
          ]

interface IItemsAsideLeft {
    value: string
    label: string
    icon: string
    count: number | null
}

interface IValuesData {
    isCommercial?: boolean
    countMyRequests?: number
    countMyProducts?: number
    constMessages?: number
}
