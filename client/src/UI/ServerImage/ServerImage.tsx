import { memo, FC } from 'react'
import noPhoto from '../../assets/images/NoPhoto.jpg'

interface IServerImage {
    src?: string;
    className?: string;
    alt: string;
    style?: React.CSSProperties
}
const ServerImage: FC<IServerImage> = memo((props) => {
    const { src = noPhoto, className, alt, style } = props
    const serverSrc = `${process.env.REACT_APP_API_URL}${src}`
    const imgBroke = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = noPhoto
    }
    return (
        <img className={className} src={serverSrc} alt={alt} onError={imgBroke} style={style}/>
    )
})

export default ServerImage