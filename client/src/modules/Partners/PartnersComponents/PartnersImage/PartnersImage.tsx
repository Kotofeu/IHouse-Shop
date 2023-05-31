import { memo, FC } from 'react'
import classes from './PartnersImage.module.scss'

interface IPartnersImage {
    src: string,
    name: string,
    width?: string
}
const PartnersImage: FC<IPartnersImage> = memo((props) => {
    const { src, width, name } = props
    return (
        <img className={classes.partnerImage} src={src} style={{ width: width }} alt={name} />
    )
})

export default PartnersImage