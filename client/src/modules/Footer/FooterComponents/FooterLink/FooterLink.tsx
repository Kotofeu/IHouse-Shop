import { memo, FC } from 'react'
import classes from './FooterLink.module.scss'
export enum FooterLinkType {
    email = classes.footer_email,
    tel = classes.footer_tel,
    social = classes.footer_socialLink,
}
interface IFooterLink {
    linkType?: FooterLinkType,
    href: string,
    children?: string,
    imageSrc?: string
}
const FooterLink: FC<IFooterLink> = memo((props) => {
    const { linkType, href, children, imageSrc } = props
    let contactType: string = '';
    if (linkType === FooterLinkType.email) contactType = 'mailto:'
    if (linkType === FooterLinkType.tel) contactType = 'tel:'
    if (contactType && linkType) {
        return (
            <a
                className={[classes.footer_link, linkType].join(' ')}
                href={`${contactType}${href}`}
            >
                {href}
            </a>
        )
    }
    if (linkType === FooterLinkType.social) {
        return (
            <a
                className={[classes.footer_link, linkType].join(' ')}
                href={href}
                target="_blank"
            >
                <img
                    className={classes.footer_socialImage}
                    src={imageSrc}
                    alt={children}
                />
                <span>{children}</span>
            </a>
        )
    }
    return (
        <a className={classes.footer_link} href={href}>{children}</a>
    )
})

export default FooterLink