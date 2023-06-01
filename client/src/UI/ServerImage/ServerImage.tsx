import { memo, FC } from 'react'
import noPhoto from '../../assets/images/NoPhoto.jpg'

interface IServerImage {
    src?: string;
    altSrc?: string;
    className?: string;
    alt: string;
    style?: React.CSSProperties
}
const ServerImage: FC<IServerImage> = memo((props) => {
    const { src = noPhoto, className, alt, style, altSrc = noPhoto} = props
    const serverSrc = `${process.env.REACT_APP_API_URL}${src}`
    const imgBroke = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = altSrc
    }
    return (
        <img className={className} src={serverSrc} alt={alt} onError={imgBroke} style={style}/>
    )
})

export default ServerImage