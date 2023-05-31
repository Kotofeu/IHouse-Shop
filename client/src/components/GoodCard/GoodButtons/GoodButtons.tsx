import { useState, FC, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
import ToggleButton from '../../../UI/ToggleButton/ToggleButton'

import favouritesImage from '../../../assets/icons/Favourites.svg'
import basketImage from '../../../assets/icons/Basket.svg'

import { deleteBasket, deleteFavourite, isGoodInBasket, isGoodInFavourite, postBasket, postFavourite } from '../http/GoodCardAPI';
import { userStore } from '../../../store'

interface IGoodCardButtons {
    goodId: number;
    cardClassName?: string;

}
const GoodCardButtons: FC<IGoodCardButtons> = observer((props) => {
    if (!userStore.isAuth) return null
    const {
        goodId,
        cardClassName = '',
    } = props
    const [isFavouriteActive, setIsFavouriteActive]
        = useState<boolean>(false)
    const [isInBasketActive, setIsInBasketActive]
        = useState<boolean>(false)
    useEffect(() => {
        isGoodInBasket(goodId).then(data => setIsInBasketActive(data))
        isGoodInFavourite(goodId).then(data => setIsFavouriteActive(data))
    }, [])
    const favouriteClick = (evetn: React.MouseEvent<HTMLButtonElement>) => {
        evetn.preventDefault()
        let successfully = undefined
        if(!isFavouriteActive){
            postFavourite(goodId).then(data => successfully = data)
        }
        else {
            deleteFavourite(goodId).then(data => successfully = data)
        }
        if (successfully) setIsFavouriteActive((prev) => !prev)
    }
    const basketClick = (evetn: React.MouseEvent<HTMLButtonElement>) => {
        evetn.preventDefault()
        let successfully = undefined
        if(!isInBasketActive){
            postBasket(goodId).then(data => successfully = data)
        }
        else {
            deleteBasket(goodId).then(data => successfully = data)
        }
        if (successfully) setIsInBasketActive((prev) => !prev)
    }
    return (
        <>
            <ToggleButton
                className={cardClassName}
                title='Избранное'
                buttonImage={favouritesImage}
                onClick={favouriteClick}
                isActive={isFavouriteActive}
            />
            <ToggleButton
                className={cardClassName}
                title='Корзина'
                buttonImage={basketImage}
                onClick={basketClick}
                isActive={isInBasketActive}
            />
        </>
    )
})

export default GoodCardButtons