import {memo, FC} from 'react'
import classes from './PartnersImage.module.scss'

interface IPartnersImage {
    src: string,
    width?: string
}
const PartnersImage: FC<IPartnersImage> = memo((props) => {
    const {src, width} = props
    return (
        <img className={classes.partnerImage} src={src} style={{ width: width}} alt={src} />
    )
})

export default PartnersImage