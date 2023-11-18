"use client"

import Image from "next/image"

import { usePush } from "@/helpers/hooks/usePush"

export default function DeleteAccount() {
    const { handlePush } = usePush()

    return (
        <>
            <header>
                <Image
                    data-image
                    src="/svg/profile/trash-03.svg"
                    alt="change"
                    width={30}
                    height={30}
                />
                <h2>Удалить аккаунт</h2>
            </header>
            <div data-not-form>
                <h3>Вы уверены что хотите удалить аккаунт?</h3>
                <footer>
                    <button
                        data-primary
                        onClick={() => {
                            handlePush("/profile")
                        }}
                    >
                        <span>Да, удалить</span>
                    </button>
                    <button
                        data-default
                        onClick={() => {
                            handlePush("/profile")
                        }}
                    >
                        <span>Нет, передумал(а)</span>
                    </button>
                </footer>
            </div>
        </>
    )
}
