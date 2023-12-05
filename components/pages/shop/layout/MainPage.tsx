"use client"

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
                              handleReplace(`/my-shop/${item.id}/`)
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
                                          event.stopPropagation()
                                          handlePush(`/my-shop/${item.id}/change`)
                                      }}
                                  >
                                      <span>Редактировать</span>
                                  </button>
                              </footer>
                          </div>
                          <div data-verification>
                              <img
                                  src={item?.confirmation ? "/svg/check-verified-03.svg" : "/svg/x-circle-red.svg"}
                                  alt="check-verified"
                                  width={24}
                                  height={24}
                              />
                          </div>
                      </li>
                  ))
                : null}
        </ul>
    )
}
