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
                className={classes.offerTitle}
                titleType={[TitleType.sectionTitle]}
            >
                Комплексные предложения
            </Title>
            <div className={classes.offersList}>
                <MySlider settings={
                    {
                        dots: true,
                        arrows: false,
                        autoplay: true,
                        slidesPerRow: 4,
                        className: classes.offerSlide
                    }
                }>
                    {offer.map(offer => (
                        <ComprehensiveOfferCard
                            title={offer.title}
                            imageSrc={offer.imageSrc}
                            key={offer.title}
                            className={classes.offerItem}
                        />
                    ))}
                </MySlider>

            </div>
        </section>
    )
}
