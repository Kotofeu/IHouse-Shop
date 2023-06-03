import {memo, FC} from 'react'

import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

import classes from './BasketGoodCard.module.scss'
import { IGoodJSON } from '../../../../store/GoodStore'

interface IBasketGoodCard{
    className?: string;
    good: IGoodJSON;

}
const BasketGoodCard: FC<IBasketGoodCard> = memo((props) => {
    const {className = '', good} = props
    const joinClassName = [classes.basketGoodCard, className].join(' ')
    return (
        <GoodCard
            className={joinClassName}
            {...good}
            cardType={GoodCardType.horizontalItem}
        />
    )
})

export default BasketGoodCard