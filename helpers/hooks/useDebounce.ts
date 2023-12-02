import { useEffect, useMemo, useCallback, useLayoutEffect, useRef } from "react"

import { debounce } from "../lib/debounce"

export function useDebounce<Fn extends (...args: any[]) => any>(fn: Fn, ms: number) {
    const memoizedFn = useEvent(fn)

    const debouncedFn = useMemo(
        () =>
            debounce((...args: Parameters<Fn>) => {
                memoizedFn(...args)
            }, ms),
        [ms, memoizedFn],
    )

    useEffect(
        () => () => {
            debouncedFn.cancel()
        },
        [debouncedFn],
    )

    return debouncedFn
}

export function useEvent<T extends Function>(fn: T) {
    const fnRef = useRef(fn)

    useLayoutEffect(() => {
        fnRef.current = fn
    }, [fn])

    const eventCb = useCallback(
        (...args: unknown[]) => {
            return fnRef.current.apply(null, args)
        },
        [fnRef],
    )

    return eventCb as unknown as T
}
