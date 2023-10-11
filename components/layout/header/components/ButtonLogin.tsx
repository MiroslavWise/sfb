import { useEnter } from "@/store/state/useEnter"

export const ButtonLogin = () => {
    const { dispatch } = useEnter()

    function handle() {
        dispatch({ visible: true })
    }

    return (
        <button onClick={handle} data-login>
            <span>Войти на сайт</span>
        </button>
    )
}
