import { memo, FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './GoodCard.module.scss'
import { IGoodJSON } from '../../../store/GoodStore';
import ServerImage from '../../../UI/ServerImage/ServerImage';
import { averageRating } from '../GoodHelpers/averageRating';
import StarRating from '../../../UI/StarRating/StarRating';
import PriceBox from '../../../UI/PriceBox/PriceBox';
import GoodCardButtons from '../GoodButtons/GoodButtons';
import GoodImages from '../GoodImages/GoodImages';

export enum GoodCardType {
    horizontalCard = classes.card___horizontal,
    fullCard = classes.card___full
}

interface IGoodCard extends IGoodJSON {
    className?: string;
    isFavouriteDefault?: boolean;
    isInBasketDefault?: boolean;
    cardType?: GoodCardType;
    counter?: ReactNode;
}
export const GoodCard: FC<IGoodCard> = memo((props) => {
    const {
        id,
        good_images,
        name,
        price,
        oldPrice,
        className = '',
        ratings,
        brand,
        cardType = '',
        counter
    } = props

    let preview;
    if (good_images && good_images[0] && (cardType !== GoodCardType.fullCard)) {
        preview = good_images.sort((a, b) => a.id - b.id)[0]
    }
    const classNameJoin = [classes.card, cardType, className].join(' ')
    return (
        <div className={classNameJoin}>
            <div className={classes.card_inner}>
                <NavLink className={classes.card_imageLink} to={`/catalog/${id}`}>
                    <GoodImages
                        className={classes.card_imageSlider}
                        imageClass={classes.card_image}
                        images={preview || good_images}
                        alt={name}
                    />
                </NavLink>
                <div className={classes.card_description}>
                    <NavLink className={classes.card_link} to={`/catalog/${id}`}>{name}</NavLink>
                    <div className={classes.card_info}>
                        <div className={classes.card_goodStat}>
                            {
                                counter
                                    ? counter
                                    : null
                            }
                            <div className={classes.card_goodStatInfo}>
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
                        </div>
                        <div className={classes.card_buy}>
                            <PriceBox className={classes.card_cost} oldCost={oldPrice} cost={price} />
                            <GoodCardButtons
                                goodId={id}
                                cardClassName={classes.card_button}
                            />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
})
