import { memo } from 'react'

import PartnersParallax from '../PartnersParallax/PartnersParallax'
import Container, { ContainerType } from '../../../../components/Container/Container'


import Vimar from '../../PartnersImages/вимар.png'
import Berker from '../../PartnersImages/berker.png'
import HDL from '../../PartnersImages/hdl.png'
import Jung from '../../PartnersImages/jung.png'
import KNX from '../../PartnersImages/knx.png'
import Schnwider from '../../PartnersImages/schnwider.png'
import IRidium from '../../PartnersImages/iridi.png'
import Seawin from '../../PartnersImages/seawin.png'


import classes from './PartnersSection.module.scss'
import Title, { TitleType } from '../../../../UI/Title/Title'

export const PartnersSection = memo(() => {
    return (
        <section className={classes.partners}>
            <Container containerType={ContainerType.containerFluid}>
                <div className={classes.partnersInner}>
                    <Title
                        className={classes.partnersTitle}
                        titleType={[TitleType.sectionTitle, TitleType.posCetner]}
                    >
                        НАШИ ПАРТНЁРЫ
                    </Title>
                    <div className={classes.partnersList}>
                        <PartnersParallax
                            className={classes.partnersParallax}
                            images={[Vimar, Jung, HDL, Berker, KNX, Schnwider, IRidium, Seawin]}
                            baseVelocity={2}
                        />
                        <PartnersParallax
                            className={classes.partnersParallax}
                            images={[]}
                            baseVelocity={-2}
                        />
                    </div>
                </div>
            </Container>
        </section>

    )
})
