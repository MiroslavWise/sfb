import { Button as Butt } from "@gravity-ui/uikit"

type TProps = typeof Butt.defaultProps & {
    label?: string
}

export const Button = (props: TProps) => {
    const { label, ...rest } = props ?? {}
    return (
        <Butt {...rest}>
            <span>{label}</span>
        </Butt>
    )
}
