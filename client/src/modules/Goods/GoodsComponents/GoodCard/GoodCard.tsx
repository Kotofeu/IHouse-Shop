import { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'

import favouritesImage from '../../../../assets/icons/Favourites.svg'
import basketImage from '../../../../assets/icons/Basket.svg'

import classes from './GoodCard.module.scss'
interface IGoodCard {
    id: number
    className?: string,
    goodImages: string,
    goodDesc: string,
    coast: number,
    oldCost?: number,
    rating?: number,
    ratingsCount?: number,
    brandImage?: string
}
const GoodCard: FC<IGoodCard> = memo((props) => {
    const {
        id,
        goodImages,
        goodDesc,
        coast,
        oldCost,
        className,
        rating,
        ratingsCount,
        brandImage,
    } = props
    const isDiscount: boolean
        = typeof oldCost !== 'undefined' && oldCost > coast;
    const addInFavourities = () => {
        // Добваление в избранное 
    }
    const addInBasket = () => {
        // Добваление в корзину 
    }
    return (
        <NavLink className={
            [classes.goodCard, className ? className : ''].join(' ')
        } to={`/catalog/${id}`}>
            <div className={classes.cardInner}>
                <div className={classes.infoBox}>
                    <div className={classes.cardImageBox}>
                        <img className={classes.cardImage} src={goodImages} alt={goodDesc} />
                    </div>
                    <p className={classes.cardDesc}>{goodDesc}</p>
                </div>
                <div className={classes.infoBox}>
                    <div className={classes.cardInfo}>
                        <div className={classes.ratingBox}>
                            <div className={classes.ratingStars}>
                                {rating}
                            </div>
                            <div className={classes.ratingCount}>
                                {ratingsCount}
                            </div>
                        </div>
                        <div className={classes.brandImageBox}>
                            <img className={classes.brandImage} src={brandImage} alt="brand" />
                        </div>
                    </div>
                    <div className={classes.bottomMenu}>
                        <div className={classes.coastBox}>

                            <div
                                className={
                                    [classes.coast, isDiscount ? classes.discountCoast : ''].join(' ')
                                }
                            >
                                {coast.toLocaleString()} ₽
                            </div>
                            {
                                isDiscount &&
                                <div className={classes.oldCoast}>{oldCost?.toLocaleString()} ₽</div>
                            }
                        </div>
                        <button
                            type='button'
                            className={classes.cardButton}
                            onClick={addInFavourities}
                        >
                            <img className={classes.cardButtonImage} src={favouritesImage} alt="favourities" />
                        </button>
                        <button
                            type='button'
                            className={classes.cardButton}
                            onClick={addInBasket}
                        >
                            <img className={classes.cardButtonImage} src={basketImage} alt="basket" />
                        </button>
                    </div>
                </div>

            </div>
        </NavLink>
    )
})

export default GoodCard