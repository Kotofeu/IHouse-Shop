import { memo, FC, HTMLAttributeReferrerPolicy } from 'react'
import classes from './Map.module.scss'
export type loadingTypes = "lazy" | "eager" | undefined
interface IMap {
    className?: string;
    src: string;
    width?: string;
    height?: string;
    allowFullScreen?: boolean;
    loading?: loadingTypes;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
}
const Map: FC<IMap> = memo((props) => {
    const {
        className = '',
        src,
        width = '100%',
        height = '500px',
        allowFullScreen = false,
        loading = "lazy",
        referrerPolicy = "no-referrer-when-downgrade"
    } = props
    return (
        <iframe
            className={[classes.map, className].join(' ')}
            src={src}
            width={width}
            height={height}
            allowFullScreen={allowFullScreen}
            loading = {loading}
            referrerPolicy= {referrerPolicy}
        />)
})

export default Map