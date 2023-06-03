import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'


import useRequest from '../../../../utils/hooks/useRequest'
import { IGetAllJSON, favouriteStore } from '../../../../store'

import Title, { TitleType } from '../../../../UI/Title/Title'
import Loader from '../../../../components/Loader/Loader'

import { fetchFavourite } from '../../../../http/FavouriteAPI'
import { IFavourite } from '../../../../store/FavouriteStore'
import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

import classes from './FavouriteGoodList.module.scss'


export const FavouriteGoodList = observer(() => {
    const [
        favourite,
        isFavouriteLoading,
        favouriteError
    ] = useRequest<IGetAllJSON<IFavourite>>(fetchFavourite())
    useEffect(() => {
        if (favourite) (
            favouriteStore.setFavourite(favourite)
        )
    }, [favourite])
    if (isFavouriteLoading) return <Loader />
    if (favouriteError) return null

    return (
        <div className={classes.favouriteList}>
            <Title
                className={classes.favouriteList_title}
                titleType={[TitleType.posCetner, TitleType.sectionTitle]}>
                Ваше избранное
            </Title>
            {
                favouriteStore.favourite?.rows.map(favourite => (
                    <GoodCard
                        className={classes.favouriteList_goodCard}
                        cardType={GoodCardType.horizontalItem}
                        {...favourite.good}
                        key={favourite.id}
                    />
                ))
            }
        </div>
    )
})

