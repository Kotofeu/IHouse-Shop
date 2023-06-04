import { observer } from 'mobx-react-lite'
import {FC} from 'react'
import BasketGoodCard from '../BasketGoodCard/BasketGoodCard'

import { basketStore } from '../../../../store'

import classes from './BasketGoodList.module.scss'

interface IBasketGoodList{
    className?: string;
}
export const BasketGoodList: FC<IBasketGoodList> = observer((props) => {
    const {className = ''} = props
    const basket = basketStore.basket?.rows
    if (!basket?.length) return null
    return (
        <div className={[classes.basketList, className].join(' ')}>
            {
               basket.map(good => (
                    <BasketGoodCard
                        className={classes.basketList_goodCard}
                        good={good.good}
                        key={good.id}
                        goodCount={good.count}
                    />
                ))
            }
        </div>
    )
})

