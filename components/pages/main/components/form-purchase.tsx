import { Select } from "antd"
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react"
import { useForm } from "react-hook-form"

export const FormPurchase = ({
    setState,
}: {
    setState: Dispatch<SetStateAction<"start" | "purchase" | "sale">>
}) => {
    const [fileString, setFileString] = useState<string[]>([])
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({})

    function onSubmit(values: IValues) {}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <span>
                    <input
                        type="text"
                        {...register("name", { required: true, minLength: 5 })}
                        placeholder="Введите название товара"
                    />
                    {errors.name ? (
                        <i>Обязательное поле(мин 5 символов)</i>
                    ) : null}
                </span>
                <span>
                    <Select
                        options={[{ label: "asdfasdf", value: "asdf" }]}
                        size="large"
                        placeholder="Выберите категорию товара"
                    />
                    {errors?.id ? <i>Выберите категорию товара</i> : null}
                </span>
                <span data-file>
                    <input
                        type="file"
                        multiple
                        {...register("files", { required: false })}
                    />
                    <label>
                        Нажмите или перетащите фото товара в эту область, чтобы
                        загрузить (.png, .jpeg, .jpg)
                    </label>
                </span>
            </section>
            <div data-buttons>
                <button data-default onClick={() => setState("start")}>
                    <span>Отмена</span>
                </button>
                <button data-primary onClick={() => {}} type="submit">
                    <span>Загрузить и продолжить</span>
                </button>
            </div>
        </form>
    )
}

interface IValues {
    name: string
    id: string | number
    files: File[]
}
