import {memo, useEffect} from 'react'
import Title, { TitleType } from '../../../../UI/Title/Title'


import { IGetAllJSON, comprehensiveOfferStore } from '../../../../store'
import useRequest from '../../../../hooks/useRequest'
import { IComprehensiveOffer } from '../../../../store/ComprehensiveOfferStore'
import { fetchComprehensiveOffer } from '../../../../http/ComprehensiveOfferAPI'

import ComprehensiveOfferSlider from '../ComprehensiveOfferSlider/ComprehensiveOfferSlider'

import classes from './ComprehensiveOfferSection.module.scss'

export const ComprehensiveOfferSection = memo(() => {
    const [
        comprehensiveOffer,
        comprehensiveOfferIsLoading,
        comprehensiveOfferrror
    ] = useRequest<IGetAllJSON<IComprehensiveOffer>>(fetchComprehensiveOffer);
    useEffect(() => {
        if (comprehensiveOffer) {
            comprehensiveOfferStore.setComprehensiveOffers(comprehensiveOffer)
        }
    }, [comprehensiveOffer])
    return (
        <section className={classes.comprehensiveOffer}>
            <Title
                className={classes.comprehensiveOffer_title}
                titleType={[TitleType.sectionTitle]}
            >
                Комплексные предложения
            </Title>
            <ComprehensiveOfferSlider/>
        </section>
    )
})