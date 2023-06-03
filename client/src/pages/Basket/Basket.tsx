import { memo } from 'react'
import Container from '../../UI/Container/Container'
import { BasketGoodList } from '../../modules/BasketGoodList'

export const Basket = memo(() => {

    return (
        <div>
            <Container>
                <BasketGoodList/>
            </Container>
        </div>
    )
})
