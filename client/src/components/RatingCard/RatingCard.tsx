import { memo, FC } from 'react'

import MySlider from '../MySlider/MySlider'
import { IRating } from '../../store/RatingStore'
import ServerImage from '../../UI/ServerImage/ServerImage';
import StarRating from '../../UI/StarRating/StarRating';
import Title from '../../UI/Title/Title';

import defaultUser from '../../assets/icons/User-icon.svg'
import classes from './RatingCard.module.scss'

interface IRatingCard {
    className?: string;
    rating: IRating;
}

const RatingCard: FC<IRatingCard> = memo((props) => {
    const { className, rating } = props
    const ratingDate = new Date(rating.updatedAt || 0)
    return (
        <div className={[classes.rating, className].join(' ')}>
            {
                rating.rating_images?.length
                    ? <MySlider
                        settings={{
                            slidesPerView: 1,
                            spaceBetween: 10,
                            pagination: { type: "fraction" },
                            autoplay: {
                                delay: 3000,
                                stopOnLastSlide: false,
                                disableOnInteraction: false
                            },
                        }}
                        className={classes.rating_imageSlider}
                        slideClass={classes.rating_slide}
                        items={rating.rating_images || []}
                        renderItem={(image) => (
                            <ServerImage
                                className={classes.rating_image}
                                key={image.id}
                                src={image.image}
                                alt={rating.comment || '' + image.id}
                            />
                        )}
                    />
                    : null
            }
            <div className={classes.rating_desc}>
                <header className={classes.rating_header}>
                    <div className={classes.rating_info}>
                        <ServerImage className={classes.rating_userImage} src={rating.user?.image || undefined} altSrc={defaultUser} alt={rating.user?.name || ''}/>
                        <Title className={classes.rating_username}>{rating.user?.name}</Title>
                        <div className={classes.rating_date}>{ratingDate.toLocaleDateString()}</div>
                    </div>
                    <StarRating className={classes.rating_star} rating={rating.rating} />
                </header>
                <div className={classes.rating_comment}>{rating.comment}</div>
            </div>
        </div>
    )
})

export default RatingCard