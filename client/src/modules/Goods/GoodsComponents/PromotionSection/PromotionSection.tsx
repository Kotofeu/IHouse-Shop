import { observer } from 'mobx-react-lite'

import GoodCard, { IGoodCard } from '../GoodCard/GoodCard'
import Title, { TitleType } from '../../../../UI/Title/Title'
import MySlider from '../../../../components/MySlider/MySlider'

import { goodStore } from '../../../../store'
import noImage from '../../../../assets/images/NoPhoto.jpg'
import classes from './PromotionSection.module.scss'
import { averageRating } from '../../../../components/StarRating/averageRating'

export const PromotionSection = observer(() => {
    const goods = goodStore.goods?.rows
    if (!goods) return null
    return (
        <section className={classes.promotion}>
            <Title className={classes.promotion_title} titleType={[TitleType.sectionTitle]}>Акции</Title>
            <MySlider
                items={goods}
                renderItem={good => {
                    return (
                        <GoodCard
                            key={good.id}
                            {...good}
                            className={classes.promotion_good}
                        />
                    )
                }}
                settings={{
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: { enabled: true },
                    scrollbar: { draggable: true },
                    autoHeight: true,
                    breakpoints: {
                        900: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        }
                    }
                }}
                slideClass={classes.promotion_slide}
                className={classes.promotion_slider}

            />
        </section>
    )
})
