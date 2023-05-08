import { memo, FC } from 'react'
import classes from './GoodCost.module.scss'
interface IGoodCost {
    className: string,
    oldCost?: number,
    cost: number,
}
const GoodCost: FC<IGoodCost> = memo((props) => {
    const { className = '', oldCost, cost } = props
    const isDiscount: boolean
        = typeof oldCost !== 'undefined' && oldCost > cost;
    return (
        <div className={[className, classes.costBox].join(' ')}>
            {
                isDiscount &&
                <div className={classes.oldCost}>{oldCost?.toLocaleString()} ₽</div>
            }
            <div
                className={
                    [classes.cost, isDiscount ? classes.discountCost : ''].join(' ')
                }
            >
                {cost.toLocaleString()} ₽
            </div>

        </div>
    )
})

export default GoodCost