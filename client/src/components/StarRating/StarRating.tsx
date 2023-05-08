import { memo, FC } from 'react'
import Rating from 'react-star-ratings'
interface IStarRating {
    rating?: number,
    setRating?: (rating: number) => void,
    className?: string
    starRatedColor?: string;
    starEmptyColor?: string;
    starHoverColor?: string;
    starDimension?: string;
    starSpacing?: string;
}
const StarRating: FC<IStarRating> = memo((props) => {
    const {
        rating = 0,
        setRating,
        className = '',
        starRatedColor = '#fc8507',
        starEmptyColor = '#D9D9D9',
        starHoverColor = 'FC9527',
        starDimension = '16px',
        starSpacing = '2px'
    } = props
    
    return (
        <div className={className}>
            
            <Rating
                rating={rating}
                changeRating={setRating}
                starRatedColor={starRatedColor}
                starEmptyColor={starEmptyColor}
                starHoverColor={starHoverColor}
                starDimension={starDimension}
                starSpacing={starSpacing}
            />
        </div>
    )
})
export default StarRating