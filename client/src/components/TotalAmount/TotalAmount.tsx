import { FC, memo } from 'react'

import classes from './TotalAmount.module.scss'

interface ITotalAmountr {
    className?: string;
    amountString: string;
    amount?: number
}
const TotalAmount: FC<ITotalAmountr> = memo((props) => {
    const { className = '', amountString, amount } = props
    return (
        <div className={[classes.totalAmount, className].join(' ')}>
            <div className={classes.totalAmount_inner}>
                <div className={classes.totalAmount_amount}>
                    {amount ? `${amountString}${amount}` : amountString}
                </div>
                <button className={classes.totalAmount_button}>
                    КУПИТЬ
                </button>
            </div>
        </div>
    )
})
export default TotalAmount