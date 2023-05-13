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
        <div className={[className, classes.cost].join(' ')}>
            {
                isDiscount &&
                <div className={classes.cost_oldValue}>{oldCost?.toLocaleString()} ₽</div>
            }
            <div
                className={
                    [classes.cost__value, isDiscount ? classes.cost_discountCost : ''].join(' ')
                }
            >
                {cost.toLocaleString()} ₽
            </div>

        </div>
    )
})

export default GoodCost