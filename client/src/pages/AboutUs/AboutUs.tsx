import { memo } from 'react'

import Container from '../../UI/Container/Container'
import { OurOffice } from '../../modules/OurOffice/OurOfficeComponents/OurOffice/OurOffice'

import classes from './AboutUs.module.scss'
import { Certificate } from '../../modules/Сertificate'


export const AboutUs = memo(() => {
    return (
        <div style={{ paddingTop: "30px" }}>
            <Container>
                <OurOffice />
                <Certificate />
            </Container>

        </div>
    )
})
