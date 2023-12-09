"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"

import { me } from "@/apollo/query"

export const DataProfile = () => {
    const { data } = useQuery(me)

    return (
        <header data-header-profile>
            {data ? (
                <>
                    <Image src={data?.me?.photo} alt="avatar" height={250} width={250} unoptimized />
                    <div data-info>
                        {data?.me?.fullName && (
                            <span data-item>
                                <label>Имя и фамилия:</label>
                                <p>{data?.me?.fullName}</p>
                            </span>
                        )}
                        <span data-item>
                            <label>Адрес:</label>
                            <p>
                                {data?.me?.area ? `${data?.me?.area?.name}, ` : ""}
                                {data?.me?.city ? `${data?.me?.city?.name}, ` : ""}
                                {data?.me?.address ? `${data?.me?.address}` : ""}
                            </p>
                        </span>
                        {data?.me?.email && (
                            <span data-item>
                                <label>Email:</label>
                                <p>{data?.me?.email}</p>
                            </span>
                        )}
                        {data?.me?.phone && (
                            <span data-item>
                                <label>Номер телефона:</label>
                                <p>{data?.me?.phone}</p>
                            </span>
                        )}
                    </div>
                </>
            ) : null}
        </header>
    )
}
