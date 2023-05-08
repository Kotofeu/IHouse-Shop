import Container from '../../../components/Container/Container'


import GoodCard from '../GoodsComponents/GoodCard/GoodCard'

import releImage from '../../../assets/images/1.png'
import curtainImage from '../../../assets/images/2.png'
import HDL from '../../Partners/PartnersImages/hdl.png'
import Jung from '../../Partners/PartnersImages/jung.png'

import classes from './PromotionSection.module.scss'

export const PromotionSection = () => {
    const goods = [
        {
            id: 1,
            goodImage: releImage,
            goodDesc: `Диммер 4 - канальный, 
            0-10В с 4-канальным релейным актуатором,
            16А на канал`,
            coast: 3333333,
            oldCost: 9999999,
            rating: 4.5,
            ratingsCount: 39,
            brandImage: HDL,
        },
        {
            id: 2,
            goodImage: curtainImage,
            goodDesc: `Актуатор 6 - канальный, 
            20 А на канал, 
            с модулем входов`,
            coast: 564.99,
            rating: 3.5,
            ratingsCount: 4,
            brandImage: Jung,
        },
        {
            id: 3,
            goodImage: curtainImage,
            goodDesc: `dfdfbdf gdfg df[g dfgdf gdfg dfgd f]`,
            coast: 564,
            rating: 3.5,
            ratingsCount: 4,
            brandImage: Jung,
        }
    ]
    return (
        <section>
            <Container>
                <div className={classes.promotionInner} style={{ display: 'flex' }}>
                    {
                        goods.map((item) => (
                            <GoodCard
                                className={classes.goodCard}
                                id={item.id}
                                goodImages={item.goodImage}
                                goodDesc={item.goodDesc}
                                coast={item.coast}
                                oldCost={item.oldCost}
                                rating={item.rating}
                                ratingsCount={item.ratingsCount}
                                brandImage={item.brandImage}
                                key={item.id}
                            />
                        ))
                    }
                </div>
            </Container>
        </section>
    )
}

