import { memo, FC } from 'react'

import classes from './ComprehensiveOfferGrid.module.scss'

interface IComprehensiveOfferGrid {

}
const ComprehensiveOfferGrid: FC<IComprehensiveOfferGrid> =
    memo(() => {
        return (
            <div className={classes.offersGrid}>
                
            </div>
        )
    }
)
export default ComprehensiveOfferGrid