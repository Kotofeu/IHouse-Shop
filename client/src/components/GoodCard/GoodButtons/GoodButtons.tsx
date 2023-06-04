import { useState, FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ToggleButton from '../../../UI/ToggleButton/ToggleButton'

import favouritesImage from '../../../assets/icons/Favourites.svg'
import basketImage from '../../../assets/icons/Basket.svg'

import { basketStore, favouriteStore, userStore } from '../../../store'
import { deleteBasket, fetchBasket, isGoodInBasket, postBasket } from '../../../http/BasketAPI'
import { deleteFavourite, fetchFavourite, isGoodInFavourite, postFavourite } from '../../../http/FavouriteAPI'

interface IGoodCardButtons {
    goodId: number;
    cardClassName?: string;
}

enum GoodButtonAction {
    FAVOURITE_ACTION = 'favourite',
    BASKET_ACTION = 'basket'
}

const GoodCardButtons: FC<IGoodCardButtons> = observer((props) => {
    const { goodId, cardClassName = '' } = props
    const [isFavouriteActive, setIsFavouriteActive] = useState<boolean>(false)
    const [isBasketActive, setIsBasketActive] = useState<boolean>(false)
    const userID = userStore.user?.id
    useEffect(() => {
        if (userStore.isAuth) {
            isGoodInBasket(goodId).then(data => setIsBasketActive(data))
            isGoodInFavourite(goodId).then(data => setIsFavouriteActive(data))
        }
    }, [goodId, userID])
    if (!userStore.isAuth) return null

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>, action: GoodButtonAction) => {
        event.preventDefault();
        const favouriteAction = isFavouriteActive ? deleteFavourite : postFavourite
        const basketAction = isBasketActive ? deleteBasket : postBasket
        try {
            if (action === GoodButtonAction.FAVOURITE_ACTION) {
                await favouriteAction(goodId)
                    .then(() => fetchFavourite()
                        .then(data => favouriteStore.setFavourite(data)))
                setIsFavouriteActive(prev => !prev)
            } else if (action === GoodButtonAction.BASKET_ACTION) {
                await basketAction(goodId)
                    .then(() => fetchBasket()
                        .then(data => basketStore.setBasket(data)))
                setIsBasketActive(prev => !prev)
            }
        } catch (error) {
            alert("Ошибка подключения")
        }
    };

    return (
        <>
            <ToggleButton
                className={cardClassName}
                title='Избранное'
                buttonImage={favouritesImage}
                onClick={(event) => handleClick(event, GoodButtonAction.FAVOURITE_ACTION)}
                isActive={isFavouriteActive}
            />
            <ToggleButton
                className={cardClassName}
                title='Корзина'
                buttonImage={basketImage}
                onClick={(event) => handleClick(event, GoodButtonAction.BASKET_ACTION)}
                isActive={isBasketActive}
            />
        </>
    )
})

export default GoodCardButtons