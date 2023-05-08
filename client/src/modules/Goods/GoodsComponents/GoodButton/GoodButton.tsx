import { FC, memo, MouseEvent } from 'react'
import classes from './GoodButton.module.scss'
interface IGoodCard {
    className?: string,
    buttonImage: string,
    title: string,
    isActive?: boolean,
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}
const GoodButton: FC<IGoodCard> = memo((props) => {
    const { className = '', buttonImage, title, isActive, onClick } = props
    return (
        <button
            type='button'
            className={
                [
                    className,
                    classes.button,
                    isActive ? classes.buttonActive : ''
                ]
                    .join(' ')
            }
            onClick={onClick}
            title={title}
        >
            <img className={classes.cardButtonImage} src={buttonImage} alt={title} />
        </button>)
})

export default GoodButton