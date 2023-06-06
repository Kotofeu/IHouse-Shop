import { memo, FC } from 'react'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import TotalAmount from '../../../../components/TotalAmount/TotalAmount'
import Title, { TitleType } from '../../../../UI/Title/Title'
import { IComprehensiveOffer } from '../../../../store/ComprehensiveOfferStore'

import classes from './OfferSectionHeader.module.scss'
interface IOfferSectionHeader {
    className?: string;
    offer?: IComprehensiveOffer;
}
export const OfferSectionHeader: FC<IOfferSectionHeader> = memo((props) => {
    const { className = '', offer } = props
    return (
        <header className={[classes.offerHeader, className].join(' ')}>
            <div className={classes.offerHeader_inner}>
                <ServerImage
                    className={classes.offerHeader_image}
                    src={offer?.image}
                    alt={offer?.name + ""}
                />
                <div className={classes.offerHeader_offerAbout}>
                    <p className={classes.offerHeader_desc}>
                        {offer?.description}
                    </p>
                    {
                        offer?.price
                            ? <TotalAmount
                                className={classes.offerHeader_amount}
                                amountString='Стоимость: '
                                amount={offer?.price}

                            />
                            : null
                    }
                </div>
            </div>
            <Title className={classes.offerHeader_title} titleType={[TitleType.posCetner]}>
                {offer?.complex_offer_goods?.length ? 'Товары в предложении' : null}
            </Title>
        </header>)
})
