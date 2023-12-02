import { TTypeMessage } from "@/types/chat"
import { CONFIG_ENV } from "../config/ENV"

const URL = CONFIG_ENV.url

const token = () => {
    if (typeof window === "undefined") {
        return null
    } else {
        return JSON.parse(localStorage.getItem("auth")!).state.token! as string
    }
}

export const uploadFile = async (file: File, type: ITypeInterfaceUpload) => {
    if (!token) {
        return {
            ok: false,
            any: "TOKEN NULL",
        }
    }
    try {
        const myHeaders = new Headers()
        myHeaders.append("Authorization", `JWT ${token()}`)

        const formData = new FormData()
        if (type.idType && type.id) {
            formData.append(type.idType, type.id)
        }
        if (type?.message_type) {
            formData.append("message_type", type?.message_type)
        }
        formData.append("file", file)
        const response = await fetch(`${URL}/api/v1/${type.type}`, {
            method: "POST",
            headers: myHeaders,
            body: formData,
        })

        const data = await response.json()
        if (data) {
            return {
                ok: true,
                any: data,
            }
        } else {
            return {
                ok: false,
                any: data,
            }
        }
    } catch (error) {
        return {
            ok: false,
            any: error,
        }
    }
}

export interface ITypeInterfaceUpload {
    type: TTypeFileURL
    idType?: TTypeFileProductId
    id?: string
    message_type?: TTypeMessage
}

export type TTypeFileURL =
    | "product/photo-upload/"
    | "product-request/photo-upload/"
    | "user/photo-upload/"
    | "chat/photo-upload/"
    | "shop/photo-upload/"

export type TTypeFileProductId = "product_id" | "product_request_id" | "chat_id" | "shop_id"
