import styles from "../styles/tag.module.scss"

export const TagCategory = ({ text }: { text: string }) => {
    return (
        <div className={styles.container}>
            <span>{text}</span>
        </div>
    )
}
