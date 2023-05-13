import React from 'react'
import Title, { TitleType } from '../../../../UI/Title/Title'
import MySlider from '../../../../components/MySlider/MySlider'

import Ligth from '../../../../assets/images/Всё для света.jpg'
import Curtain from '../../../../assets/images/Шторы.jpg'
import SmartHouse from '../../../../assets/images/Умный дом.jpg'
import Floor from '../../../../assets/images/Тёплый пол.jpg'

import classes from './ComprehensiveOfferSection.module.scss'
import ComprehensiveOfferCard from '../ComprehensiveOfferCard/ComprehensiveOfferCard'

export const ComprehensiveOfferSection = () => {
    const offer = [
        {
            title: "Всё для света",
            imageSrc: Ligth
        },
        {
            title: "Всё для штор",
            imageSrc: Curtain
        },
        {
            title: "Умный дом",
            imageSrc: SmartHouse
        },
        {
            title: "Комплект тёплого пола",
            imageSrc: Floor
        },
        {
            title: "Всё для света",
            imageSrc: Ligth
        },
        {
            title: "Всё для штор",
            imageSrc: Curtain
        },
        {
            title: "Умный дом",
            imageSrc: SmartHouse
        },
        {
            title: "Комплект тёплого пола",
            imageSrc: Floor
        },

        {
            title: "Всё для света",
            imageSrc: Ligth
        },
        {
            title: "Всё для штор",
            imageSrc: Curtain
        },
        {
            title: "Умный дом",
            imageSrc: SmartHouse
        },
        {
            title: "Комплект тёплого пола",
            imageSrc: Floor
        },

        {
            title: "Всё для света",
            imageSrc: Ligth
        },
        {
            title: "Всё для штор",
            imageSrc: Curtain
        },
        {
            title: "Умный дом",
            imageSrc: SmartHouse
        },
        {
            title: "Комплект тёплого пола",
            imageSrc: Floor
        },


    ]
    return (
        <section className={classes.comprehensiveOffer}>
            <Title
                className={classes.comprehensiveOffer_title}
                titleType={[TitleType.sectionTitle]}
            >
                Комплексные предложения
            </Title>
            <MySlider
                items={offer}
                renderItem={offer =>
                    <ComprehensiveOfferCard
                        className={classes.comprehensiveOffer_offer}
                        title={offer.title}
                        imageSrc={offer.imageSrc}
                    />
                }
                settings={{
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {enabled: true},
                    pagination: {type: "fraction"},
                    autoHeight: true,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                        },
                        668: {
                            slidesPerView: 2,
                        },
                        900: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        }
                    }
                }}
                slideClass={classes.comprehensiveOffer_slide}
                className={classes.comprehensiveOffer_slider}
                
            />
        </section>
    )
}