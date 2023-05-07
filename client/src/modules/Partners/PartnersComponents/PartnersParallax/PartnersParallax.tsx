import { FC, memo } from 'react'
import ScrollParallax from '../../../../components/ScrollParallax/ScrollParallax'
import classes from './PartnersParallax.module.scss'
import PartnersImage from '../PartnersImage/PartnersImage'
interface IPartnersParallaxProps {
    images: string[],
    className: string,
    baseVelocity: number
}
const PartnersParallax: FC<IPartnersParallaxProps> = memo(({images, className, baseVelocity = 3}) => {
    if (images.length === 0){
        return null
    }
    /*
        1920 - ширина Container fluid
        2 - так как в ScrollParallax используется 4 спана,
         для бесшовной склейки необходимо растянуть спан до половины максимального размера экрана
    */
    const maxWidth = 1920  / 2
    const imageWidth = maxWidth / images.length
    return (
        <ScrollParallax baseVelocity={baseVelocity} className={className}>
            <div className={classes.parallaxInner} style={{width: `${maxWidth}px`}}>
                {images.map(item => (<PartnersImage width={imageWidth} src={item} key={item}/>))}
            </div>
        </ScrollParallax>

    )
})
export default PartnersParallax