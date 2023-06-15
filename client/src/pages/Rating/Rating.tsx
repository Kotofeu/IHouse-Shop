import { memo } from 'react'
import { MyRatingSection } from '../../modules/MyRatingSection'
import Container from '../../UI/Container/Container'

export const Rating = memo(() => {
    return (
        <div>
            <Container>
                <MyRatingSection />

            </Container>
        </div>
    )
})
