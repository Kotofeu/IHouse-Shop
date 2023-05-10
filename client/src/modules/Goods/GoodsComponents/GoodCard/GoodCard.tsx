import { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'


import noPhoto from '../../../../assets/images/NoPhoto.jpg'
import StarRating from '../../../../components/StarRating/StarRating'

import classes from './GoodCard.module.scss'
import GoodCardButtons from '../GoodCardButtons/GoodCardButtons'
import GoodCost from '../GoodCost/GoodCost'

interface IGoodCard {
    id: number
    className?: string,
    goodImages: string,
    goodDesc: string,
    cost: number,
    oldCost?: number,
    rating?: number,
    ratingsCount?: number,
    brandImage?: string,
    isFavouriteDefault?: boolean,
    isInBasketDefault?: boolean
}
const GoodCard: FC<IGoodCard> = memo((props) => {
    const {
        id,
        goodImages,
        goodDesc,
        cost,
        oldCost,
        className,
        rating,
        ratingsCount,
        brandImage,
        isFavouriteDefault = false,
        isInBasketDefault = false
    } = props

    const imgBroke = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = noPhoto
    }
    return (
        <div className={
            [classes.goodCard, className ? className : ''].join(' ')
        }>
            <div className={classes.cardInner}>
                <NavLink className={classes.cardLink} to={`/catalog/${id}`}>
                    <div className={classes.cardImageBox}>
                        <img
                            className={classes.cardImage}
                            src={goodImages}
                            alt={goodDesc}
                            onError={imgBroke}
                        />
                    </div>
                    <p className={classes.cardDesc}>{goodDesc}</p>
                </NavLink>
                <div className={classes.infoBox}>
                    <div className={classes.cardInfo}>
                        {
                            rating
                                ? <div className={classes.ratingBox}>
                                    <StarRating className={classes.ratingStars} rating={rating} />
                                    <div className={classes.ratingCount}>
                                        {ratingsCount}
                                    </div>
                                </div>
                                : <div className={classes.noRating}>
                                    Нет отзывов
                                </div>
                        }
                        {
                            brandImage
                                ? <div className={classes.brandImageBox}>
                                    <img className={classes.brandImage} src={brandImage} alt="brand" />
                                </div>
                                : null
                        }

                    </div>
                    <div className={classes.bottomMenu}>
                        <GoodCost className={classes.cardCost} oldCost={oldCost} cost={cost} />
                        <GoodCardButtons
                            cardClassName={classes.cardButton}
                            isFavouriteDefault={isFavouriteDefault}
                            isInBasketDefault={isInBasketDefault}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
})

export default GoodCard