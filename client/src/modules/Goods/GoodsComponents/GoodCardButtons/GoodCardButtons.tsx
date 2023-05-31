import { memo, useState, FC, useEffect} from 'react'
import GoodButton from '../GoodButton/GoodButton'

import favouritesImage from '../../../../assets/icons/Favourites.svg'
import basketImage from '../../../../assets/icons/Basket.svg'
import { isGoodInBasket, postBasket } from '../../../../http/BasketAPI';
import { isGoodInFavourite, postFavourite } from '../../../../http/FavouriteAPI';

interface IGoodCardButtons {
    goodId: number;
    cardClassName?: string;
    isFavouriteDefault: boolean;
    isInBasketDefault: boolean;

}
const GoodCardButtons: FC<IGoodCardButtons> = memo(
    (props) => {
        const {
            goodId,
            cardClassName = '',
            isFavouriteDefault = false,
            isInBasketDefault = false
        } = props
        const [isFavouriteActive, setIsFavouriteActive]
            = useState<boolean>(isFavouriteDefault)
        const [isInBasketActive, setIsInBasketActive]
            = useState<boolean>(isInBasketDefault)
        useEffect(() => {
            isGoodInBasket(goodId).then(data => setIsInBasketActive(data))
            isGoodInFavourite(goodId).then(data => setIsFavouriteActive(data))
        }, [])
        const addInFavourities = (evetn: React.MouseEvent<HTMLButtonElement>) => {
            evetn.preventDefault()
            setIsFavouriteActive((prev) => !prev)
            postFavourite(goodId)
        }
        const addInBasket = (evetn: React.MouseEvent<HTMLButtonElement>) => {
            evetn.preventDefault()
            setIsInBasketActive((prev) => !prev)
            postBasket({goodId})
        }
        return (
            <>
                <GoodButton
                    className={cardClassName}
                    title='Избранное'
                    buttonImage={favouritesImage}
                    onClick={addInFavourities}
                    isActive={isFavouriteActive}
                />
                <GoodButton
                    className={cardClassName}
                    title='Корзина'
                    buttonImage={basketImage}
                    onClick={addInBasket}
                    isActive={isInBasketActive}
                />
            </>
        )
    })

export default GoodCardButtons