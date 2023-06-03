import { memo, FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './GoodCard.module.scss'
import { IGoodJSON } from '../../../store/GoodStore';
import ServerImage from '../../../UI/ServerImage/ServerImage';
import { averageRating } from '../GoodHelpers/averageRating';
import StarRating from '../../../UI/StarRating/StarRating';
import PriceBox from '../../../UI/PriceBox/PriceBox';
import GoodCardButtons from '../GoodButtons/GoodButtons';
import Input from '../../../UI/Input/Input';

export enum GoodCardType {
    horizontalItem = classes.card___horizontal
}

interface IGoodCard extends IGoodJSON {
    className?: string;
    isFavouriteDefault?: boolean;
    isInBasketDefault?: boolean;
    cardType?: GoodCardType;
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
        cardType = ''
    } = props

    let preview;
    if (good_images && good_images[0]) {
        preview = good_images[0].image
    }
    const classNameJoin = [classes.card, cardType, className].join(' ')
    return (
        <div className={classNameJoin}>
            <div className={classes.card_inner}>
                <div className={classes.card_link}>
                    <NavLink className={classes.card_imageBox} to={`/catalog/${id}`}>
                        <ServerImage
                            className={classes.card_image}
                            src={preview}
                            alt={name}
                        />
                    </NavLink>
                    <div className={classes.card_name}>
                        <NavLink to={`/catalog/${id}`}>{name}</NavLink>
                    </div>
                </div>
                {
                    cardType === GoodCardType.horizontalItem
                        ? <div className={classes.card_count}>
                            <div className={classes.card_countField}>
                                <button className={classes.card_countButton}>{'<'}</button>
                                <Input value='122' onChange={() => null} className={classes.card_countInput} type="number" />
                                <button className={classes.card_countButton}>{'>'}</button>
                            </div>

                        </div>
                        : null
                }
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
