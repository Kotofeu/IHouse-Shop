import { memo } from 'react'
import { observer } from 'mobx-react-lite'

import PartnersParallax from '../PartnersParallax/PartnersParallax'
import Title, { TitleType } from '../../../../UI/Title/Title'


import classes from './PartnersSection.module.scss'
import { brandStore } from '../../../../store'
import { IBrandTable } from '../../../../store/BrandStore'

export const PartnersSection = observer(() => {
    const brands = brandStore.brands;

    if (!brands) {
        return null
    }

    const brandsLength = Math.ceil(brands.count / 2);
    const slicedBrand: IBrandTable[][] = []
    if (brandsLength < 6) {
        const slicedBrandLeft = brands.rows.slice(0, brandsLength);
        const slicedBrandRight = brands.rows.slice(brandsLength, brands.count);
        slicedBrand.push(slicedBrandLeft)
        slicedBrand.push(slicedBrandRight)
    }
    return (
        <section className={classes.partners}>
            <div className={classes.partners_inner}>
                <Title
                    className={classes.partners_title}
                    titleType={[TitleType.sectionTitle]}
                >
                    Наши партнёры
                </Title>
                <div className={classes.partners_list}>
                    {
                        slicedBrand
                            ?
                            slicedBrand.map((brands, index) => {
                                let velocity = 2
                                if (index % 2 === 0){
                                    velocity = -2
                                }
                                else {
                                    velocity = 2
                                }
                                return (
                                    <PartnersParallax
                                        className={classes.partners_parallax}
                                        brands={brands}
                                        baseVelocity={velocity}
                                        key={index}
                                    />
                                )
                            })
                            : <PartnersParallax
                                className={classes.partners_parallax}
                                brands={brands.rows}
                                baseVelocity={2}
                            />
                    }
                </div>
            </div>
        </section>

    )
})
/*

*/