import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'


import useRequest from '../../../../utils/hooks/useRequest'
import { IGetAllJSON, basketStore } from '../../../../store'
import { fetchBasket } from '../../../../http/BasketAPI'
import { IBasket } from '../../../../store/BasketStore'

import Title, { TitleType } from '../../../../UI/Title/Title'
import Loader from '../../../../components/Loader/Loader'
import BasketGoodCard from '../BasketGoodCard/BasketGoodCard'

import classes from './BasketGoodList.module.scss'

export const BasketGoodList = observer(() => {
    const [
        basket,
        isBasketLoading,
        basketError
    ] = useRequest<IGetAllJSON<IBasket>>(fetchBasket())
    useEffect(() => {
        if (basket) (
            basketStore.setBasket(basket)
        )
    }, [basket])
    if (isBasketLoading) return <Loader />
    if (basketError) return null

    return (
        <div className={classes.basketList}>
            <Title
                className={classes.basketList_title}
                titleType={[TitleType.posCetner, TitleType.sectionTitle]}>
                Ваша корзина
            </Title>
            {
                basketStore.basket?.rows.map(good => (
                    <BasketGoodCard
                        className={classes.basketList_goodCard}
                        good={good.good}
                        key={good.id}
                    />
                ))
            }
        </div>
    )
})

