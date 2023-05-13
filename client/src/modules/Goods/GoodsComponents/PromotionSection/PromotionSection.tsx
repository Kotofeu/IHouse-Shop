import GoodCard, { IGoodCard } from '../GoodCard/GoodCard'
import Title, { TitleType } from '../../../../UI/Title/Title'

import releImage from '../../../../assets/images/1.png'
import curtainImage from '../../../../assets/images/2.png'
import HDL from '../../../Partners/PartnersImages/hdl.png'
import Jung from '../../../Partners/PartnersImages/jung.png'

import classes from './PromotionSection.module.scss'
import MySlider from '../../../../components/MySlider/MySlider'

export const PromotionSection = () => {
    const goods: IGoodCard[] = [
        {
            id: 1,
            goodImages: releImage,
            goodDesc: `Диммер 4 - канальный, 
            0-10В с 4-канальным релейным актуатором,
            16А на канал`,
            cost: 3333333,
            oldCost: 9999999,
            rating: 4.5,
            ratingsCount: 39,
            brandImage: HDL,
        },
        {
            id: 2,
            goodImages: curtainImage,
            goodDesc: `Актуатор 6 - канальный, 
            20 А на канал, 
            с модулем входов`,
            cost: 564.99,
            oldCost: 34,
            rating: 3.5,
            ratingsCount: 4,
            brandImage: Jung,
        },
        {
            id: 4,
            goodImages: curtainImage,
            goodDesc: `Актуатор 6 - канальный, 
            20 А на канал, 
            с модулем входов`,
            cost: 564.99,
            oldCost: 34,
            rating: 3.5,
            ratingsCount: 4,
            brandImage: Jung,
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        },
        {
            id: 5,
            goodImages: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            cost: 564
        }
    ]
    return (
        <section className={classes.promotion}>
            <Title className={classes.promotion_title} titleType={[TitleType.sectionTitle]}>Акции</Title>
            <MySlider
                items={goods}
                renderItem={item =>
                    <GoodCard
                        className={classes.promotion_good}
                        id={item.id}
                        goodImages={item.goodImages}
                        goodDesc={item.goodDesc}
                        cost={item.cost}
                        oldCost={item.oldCost}
                        rating={item.rating}
                        ratingsCount={item.ratingsCount}
                        brandImage={item.brandImage}
                    />
                }
                settings={{
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: { enabled: true},
                    scrollbar: {draggable: true},
                    autoHeight: true,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                        },
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
}

