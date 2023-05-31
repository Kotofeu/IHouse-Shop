import { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './GoodCard.module.scss'
import { IGoodJSON } from '../../../store/GoodStore';
import ServerImage from '../../../UI/ServerImage/ServerImage';
import { averageRating } from '../GoodHelpers/averageRating';
import StarRating from '../../../UI/StarRating/StarRating';
import PriceBox from '../../../UI/PriceBox/PriceBox';
import GoodCardButtons from '../GoodButtons/GoodButtons';



export interface IGoodCard extends IGoodJSON {
    className?: string;
    isFavouriteDefault?: boolean;
    isInBasketDefault?: boolean;
}
export const GoodCard: FC<IGoodCard> = memo((props) => {
    const {
        id,
        good_images,
        name,
        price,
        oldPrice,
        className,
        ratings,
        brand,
    } = props
    
    let preview;
    if (good_images && good_images[0]) {
        preview = good_images[0].image
    }
    return (
        <div className={
            [classes.card, className ? className : ''].join(' ')
        }>
            <div className={classes.card_inner}>
                <NavLink className={classes.card_link} to={`/catalog/${id}`}>
                    <div className={classes.card_imageBox}>
                        <ServerImage
                            className={classes.card_image}
                            src={preview}
                            alt={name}
                        />
                    </div>
                    <p className={classes.card_desc}>{name}</p>
                </NavLink>
                <div className={classes.card_infoBox}>
                    <div className={classes.card_info}>
                        {
                            ratings.length
                                ? <div className={classes.card_rating}>
                                    <StarRating className={classes.card_ratingStars} rating={averageRating(ratings)} />
                                    <div className={classes.card_ratingCount}>
                                        {ratings.length}
                                    </div>
                                </div>
                                : <div className={classes.card_rating___empty}>
                                    Нет отзывов
                                </div>
                        }
                        {
                            brand
                                ? <div className={classes.card_brand}>
                                    <ServerImage
                                        className={classes.card_brandImage}
                                        src={brand.image}
                                        alt={name}
                                    />
                                </div>
                                : null
                        }

                    </div>
                    <div className={classes.card_menu}>
                        <PriceBox className={classes.card_cost} oldCost={oldPrice} cost={price} />
                        <GoodCardButtons
                            goodId={id}
                            cardClassName={classes.card_button}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
})
