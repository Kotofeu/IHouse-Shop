import { memo, FC } from 'react'

import classes from './ComprehensiveOfferCard.module.scss'
interface IComprehensiveOfferCard {
    title: string,
    imageSrc: string,
    className?: string
}
const ComprehensiveOfferCard: FC<IComprehensiveOfferCard> =
    memo((props) => {
        const { title, imageSrc, className} = props
        return (
            <div className={[classes.offer, className].join(' ')}>
                <span className={classes.offerTitle}>
                    {title}
                </span>
                <img
                    className={classes.offerImage}
                    src={imageSrc}
                    alt={title}
                />
            </div>
        )
    })

export default ComprehensiveOfferCard