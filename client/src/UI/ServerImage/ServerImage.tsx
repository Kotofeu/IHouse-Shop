import { memo, FC } from 'react'
import noPhoto from '../../assets/images/NoPhoto.jpg'

interface IServerImage {
    src?: string;
    className?: string;
    alt: string;
}
const ServerImage: FC<IServerImage> = memo((props) => {
    const { src = noPhoto, className, alt } = props
    const serverSrc = `${process.env.REACT_APP_API_URL}${src}`
    const imgBroke = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = noPhoto
    }
    return (
        <img className={className} src={serverSrc} alt={alt} onError={imgBroke} />
    )
})

export default ServerImage