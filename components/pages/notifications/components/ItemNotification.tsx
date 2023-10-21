"use client"

import { IItemNotification } from "@/types/chat"
import Image from "next/image"

export const ItemNotification = (props: IItemNotification) => {
    const { verb, id } = props ?? {}

    return (
        <div data-item-notification>
            <header>
                <Image
                    src="/svg/bell-ringing-03.svg"
                    alt="bell"
                    width={40}
                    height={40}
                />
                <h3>{verb}</h3>
            </header>
            <footer>
                <button data-default>
                    <span>Прочитано</span>
                </button>
                <button data-black>
                    <span>Перейти</span>
                    <Image
                        src="/svg/share-06.svg"
                        alt="share"
                        width={18}
                        height={18}
                    />
                </button>
            </footer>
        </div>
    )
}
