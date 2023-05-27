import { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'


import noPhoto from '../../../../assets/images/NoPhoto.jpg'
import StarRating from '../../../../components/StarRating/StarRating'

import classes from './GoodCard.module.scss'
import GoodCardButtons from '../GoodCardButtons/GoodCardButtons'
import GoodCost from '../GoodCost/GoodCost'

export interface IGoodCard {
    id: number;
    className?: string;
    goodImages: string;
    goodDesc: string;
    cost: number;
    oldCost?: number;
    rating?: number;
    ratingsCount?: number;
    brandImage?: string;
    isFavouriteDefault?: boolean;
    isInBasketDefault?: boolean;
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
            [classes.card, className ? className : ''].join(' ')
        }>
            <div className={classes.card_inner}>
                <NavLink className={classes.card_link} to={`/catalog/${id}`}>
                    <div className={classes.card_imageBox}>
                        <img
                            className={classes.card_image}
                            src={goodImages}
                            alt={goodDesc}
                            onError={imgBroke}
                        />
                    </div>
                    <p className={classes.card_desc}>{goodDesc}</p>
                </NavLink>
                <div className={classes.card_infoBox}>
                    <div className={classes.card_info}>
                        {
                            rating
                                ? <div className={classes.card_rating}>
                                    <StarRating className={classes.card_ratingStars} rating={rating} />
                                    <div className={classes.card_ratingCount}>
                                        {ratingsCount}
                                    </div>
                                </div>
                                : <div className={classes.card_rating___empty}>
                                    Нет отзывов
                                </div>
                        }
                        {
                            brandImage
                                ? <div className={classes.card_brand}>
                                    <img className={classes.card_brandImage} src={brandImage} alt="brand" />
                                </div>
                                : null
                        }

                    </div>
                    <div className={classes.card_menu}>
                        <GoodCost className={classes.card_cost} oldCost={oldCost} cost={cost} />
                        <GoodCardButtons
                            cardClassName={classes.card_button}
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