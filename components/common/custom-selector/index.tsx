import { useId } from "react"

import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const CustomSelector: TProps = ({ label, onClick, list, placeholder }) => {
    const $id = useId()
    const [state, setState, ref] = useOutsideClickEvent()

    return (
        <div ref={ref} className={styles.container} data-selector>
            <div data-label onClick={() => setState(true)}>
                <span data-is-label={!!label}>{label ? label : placeholder}</span>
            </div>
            {state && list && list?.length ? (
                <ul
                    data-visible={state}
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                >
                    {list?.map((item) => (
                        <li
                            key={`${item?.id}-${$id}`}
                            onClick={(event) => {
                                event.stopPropagation()
                                onClick(item?.id)
                                setState(false)
                            }}
                        >
                            <p>{item.p}</p>
                            {item?.a ? <a>{item?.a}</a> : null}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}
