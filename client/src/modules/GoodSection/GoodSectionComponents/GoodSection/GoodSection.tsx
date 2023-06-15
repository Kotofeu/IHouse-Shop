import { memo, useEffect } from 'react'
import SectionList from '../../../../components/SectionList/SectionList'
import { IGoodJSON } from '../../../../store/GoodStore'
import { fetchOneGood } from '../../../../http/GoodAPI'
import useRequest from '../../../../utils/hooks/useRequest'
import { useParams } from 'react-router-dom'
import StarRating from '../../../../UI/StarRating/StarRating'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import defaultUserImage from '../../../../assets/icons/User-icon.svg'
import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

export const GoodSection = memo(() => {
    const { id } = useParams();
    const [
        good,
        isGoodLoading,
        goodError, ,
        setGoodParams
    ] = useRequest<IGoodJSON>(fetchOneGood, null, false)
    useEffect(() => {
        if (id && +id) {
            setGoodParams(+id)
        }
    }, [])
    return (
        <SectionList
            className='good'
            error={goodError}
            isLoading={isGoodLoading}
            emptySubtitle=''
            items={good?.ratings || []}
            header={(
                <div className='good_card'>
                    {
                        good ?
                            <GoodCard
                                cardType={GoodCardType.fullCard}
                                className=''
                                {...good}
                            />
                            : null
                    }
                </div>
            )}
            renderItem={rating => {
                return (
                    <div key={rating.id}>
                        <div>{rating.rating_images?.map((image, index) => (
                            <ServerImage key={image.id} src={image.image} alt={(rating.comment || "Изображение рейтинга") + ": " + ++index} />
                        ))}</div>
                        <StarRating rating={rating.rating} />
                        <div>{rating.comment}</div>
                        <div>{rating?.updatedAt + ''}</div>
                        <div>{rating.user?.image}</div>
                        <div>{rating.user?.name}</div>
                        <ServerImage src={rating.user?.image || undefined} altSrc={defaultUserImage} alt={rating.user?.name || "undefined user"} />
                    </div>
                )
            }
            }

        />
    )
})