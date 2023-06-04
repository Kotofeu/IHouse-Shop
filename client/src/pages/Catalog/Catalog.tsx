import {memo} from 'react'
import Container from '../../UI/Container/Container'
import { FilterAside } from '../../modules/FilterAside'
import { CatalogSection } from '../../modules/CatalogSection'

export const Catalog = memo(() => {
  return (
    <div>
        <Container>
            <div style={{display: 'flex'}}>
                <FilterAside/>
                <CatalogSection/>
            </div>
        </Container>
    </div>
  )
})

