import Image from "next/image"
import { useQuery } from "@apollo/client"

import type { IListShop } from "@/types/shop"

import { queryShopList } from "@/apollo/query-"
import { usePush } from "@/helpers/hooks/usePush"

export const ShopMainPage = () => {
    const { data } = useQuery<IListShop>(queryShopList)
    const { handleReplace, handlePush } = usePush()

    return (
        <ul>
            {!!data?.shopList?.totalCount
                ? data?.shopList?.results?.map((item) => (
                      <li
                          key={`${item.id}-shop-my`}
                          onClick={() => {
                              handleReplace(`/my-shop?id=${item.id}`)
                          }}
                      >
                          {item.photoUrl ? (
                              <Image src={item.photoUrl} alt="photo" width={380} height={380} unoptimized />
                          ) : (
                              <div data-img>
                                  <span>Нет фотографии</span>
                              </div>
                          )}
                          <div data-info>
                              <header>
                                  <h3>{item.name}</h3>
                                  <h4>{item.description}</h4>
                              </header>
                              <footer>
                                  <button data-read>
                                      <span>Смотреть</span>
                                  </button>
                                  <button
                                      data-change
                                      onClick={(event) => {
                                          event.preventDefault()
                                          event.stopPropagation()
                                          handlePush(`/my-shop/change?id=${item.id}`)
                                      }}
                                  >
                                      <span>Редактировать</span>
                                  </button>
                              </footer>
                          </div>
                          <div data-verification>
                              <img src="/svg/check-verified-03.svg" alt="check-verified" width={25} height={25} />
                          </div>
                      </li>
                  ))
                : null}
        </ul>
    )
}
