import { CONFIG_ENV } from "../config/ENV"

const URL = CONFIG_ENV.url

const token = () => {
    if (typeof window === "undefined") {
        return null
    } else {
        return JSON.parse(localStorage.getItem("auth")!).state.token! as string
    }
}

export const uploadFile = async (file: File, type: ITypeInterface) => {
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
        formData.append(type.idType, type.id)
        formData.append("file", file, file.name)
        const response = await fetch(`${URL}/api/v1/${type.type}`, {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow",
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

interface ITypeInterface {
    type: TTypeFileURL
    idType: TTypeFileProductId
    id: string
}

export type TTypeFileURL =
    | "product/photo-upload/"
    | "product-request/photo-upload/"

export type TTypeFileProductId = "product_id" | "product_request_id"
