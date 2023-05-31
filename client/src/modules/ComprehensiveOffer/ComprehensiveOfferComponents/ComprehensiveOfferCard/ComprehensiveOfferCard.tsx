import { memo, FC } from 'react'

import classes from './ComprehensiveOfferCard.module.scss'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
export interface IComprehensiveOfferCard {
    title: string,
    imageSrc: string,
    className?: string
}
const ComprehensiveOfferCard: FC<IComprehensiveOfferCard> =
    memo((props) => {
        const { title, imageSrc, className } = props
        return (
            <div className={[classes.offer, className].join(' ')}>
                <span className={classes.offer_title}>
                    {title}
                </span>
                <ServerImage
                    className={classes.offer_image}
                    src={imageSrc}
                    alt={title}
                />
            </div>
        )
    })

export default ComprehensiveOfferCard