import {memo} from 'react'
import Container from '../../UI/Container/Container'
import { FavouriteGoodList } from '../../modules/FavouriteGoodList'

export const Favourite = memo(() => {
    return (
        <div>
            <Container>
                <FavouriteGoodList/>
            </Container>
        </div>
    )
})
