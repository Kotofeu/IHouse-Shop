import { memo, useState, FC } from 'react'
import GoodButton from '../GoodButton/GoodButton'

import favouritesImage from '../../../../assets/icons/Favourites.svg'
import basketImage from '../../../../assets/icons/Basket.svg'

interface IGoodCardButtons {
    cardClassName?: string,
    isFavouriteDefault: boolean,
    isInBasketDefault: boolean

}
const GoodCardButtons: FC<IGoodCardButtons> = memo(
    (props) => {
        const {
            cardClassName = '',
            isFavouriteDefault = false,
            isInBasketDefault = false
        } = props
        const [isFavouriteActive, setIsFavouriteActive]
            = useState<boolean>(isFavouriteDefault)
        const [isInBasketActive, setIsInBasketActive]
            = useState<boolean>(isInBasketDefault)
        const addInFavourities = (evetn: React.MouseEvent<HTMLButtonElement>) => {
            evetn.preventDefault()
            setIsFavouriteActive((prev) => !prev)
            // Добваление в избранное 
        }
        const addInBasket = (evetn: React.MouseEvent<HTMLButtonElement>) => {
            evetn.preventDefault()
            setIsInBasketActive((prev) => !prev)
            // Добваление в корзину 
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