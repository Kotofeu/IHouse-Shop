import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'


import useRequest from '../../../../utils/hooks/useRequest'
import { IGetAllJSON, favouriteStore } from '../../../../store'

import { fetchFavourite } from '../../../../http/FavouriteAPI'
import { IFavourite } from '../../../../store/FavouriteStore'
import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

import classes from './FavouriteGoodList.module.scss'
import SectionList from '../../../../components/SectionList/SectionList'


export const FavouriteGoodList =  observer(() => {
    const [
        favourite,
        isFavouriteLoading,
        favouriteError
    ] = useRequest<IGetAllJSON<IFavourite>>(fetchFavourite())
    useEffect(() => {
        if (favourite) {
            favouriteStore.setFavourite(favourite)
        }
    }, [favourite])

    return (
        <div className={classes.favouriteList}>
            <SectionList
                title='Ваше избранное'
                error={favouriteError}
                emptySubtitle='У вас нет избранных товаров'
                isLoading={isFavouriteLoading}
                items={favouriteStore.favourite?.rows || []}
                renderItem={(item: IFavourite) => (
                    <GoodCard
                        className={classes.favouriteList_goodCard}
                        cardType={GoodCardType.horizontalItem}
                        {...item.good}
                        key={item.id}
                    />
                )}
            />
        </div>
    )
})

