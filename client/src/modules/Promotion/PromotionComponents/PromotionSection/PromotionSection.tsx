import { memo, useEffect } from 'react'

import { IGetAllJSON, promotionStore } from '../../../../store'
import Title, { TitleType } from '../../../../UI/Title/Title'
import PromotionSlider from '../PromotionSlider/PromotionSlider'
import useRequest from '../../../../utils/hooks/useRequest'
import { IGoodJSON } from '../../../../store/GoodStore'


import classes from './PromotionSection.module.scss'
import { fetchGood } from '../../../../http/GoodAPI'

export const PromotionSection = memo(() => {
    const [
        goods,
        goodsIsLoading,
        goodsError
    ] = useRequest<IGetAllJSON<IGoodJSON>>(fetchGood({isPromotion: true}));
    
    useEffect(() => {
        if (goods) {
            promotionStore.setPromotionGoods(goods)
            
        }
    }, [goods])

    return (
        <section className={classes.promotion}>
            <Title className={classes.promotion_title} titleType={[TitleType.sectionTitle]}>Акции</Title>
            <PromotionSlider />
        </section>
    )
})
