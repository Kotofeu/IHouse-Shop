import { memo, FC } from 'react'
import classes from './PriceBox.module.scss'
interface IPriceBox {
    className: string;
    oldCost?: number | null;
    cost: number;
}
const PriceBox: FC<IPriceBox> = memo((props) => {
    const { className = '', oldCost, cost } = props
    const isDiscount: boolean
        = typeof oldCost === 'number' && oldCost > cost;
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

export default PriceBox