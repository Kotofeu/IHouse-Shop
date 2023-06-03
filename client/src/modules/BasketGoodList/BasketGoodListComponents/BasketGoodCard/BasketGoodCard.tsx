import { memo, FC, useState, useEffect } from 'react'

import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

import { IGoodJSON } from '../../../../store/GoodStore'
import useDebounce from '../../../../utils/hooks/useDebounce';
import { postBasket } from '../../../../http/BasketAPI';
import Counter, { CounterButtonType } from '../../../../components/Counter/Counter';

import classes from './BasketGoodCard.module.scss'


interface IBasketGoodCard {
    className?: string;
    good: IGoodJSON;
    goodCount: number;

}
const BasketGoodCard: FC<IBasketGoodCard> = memo((props) => {
    const { className = '', good, goodCount } = props
    const [count, setCount] = useState<number>(goodCount || 1);
    const debouncedValue = useDebounce<number>(count, 1000)
    useEffect(() => {
        postBasket(good.id, debouncedValue)
    }, [debouncedValue])
    const joinClassName = [classes.basketgoodCard, className].join(' ')
    return (
        <GoodCard
            className={joinClassName}
            {...good}
            cardType={GoodCardType.horizontalItem}
            counter={
                <Counter
                    className={classes.basketgoodCard_counter}
                    count={count}
                    setCount={setCount}
                    maxCount={99}
                    minCount={1}
                    counterButtonType={CounterButtonType.arrow}
                />
            }
        />
    )
})

export default BasketGoodCard