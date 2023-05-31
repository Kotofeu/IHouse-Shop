import Container from '../../../../UI/Container/Container'

import FooterTitle, { FooterTitleType } from '../FooterTitle/FooterTitle'
import FooterLink, { FooterLinkType } from '../FooterLink/FooterLink'
import FooterSubscribe from '../FooterSubscribe/FooterSubscribe'

import { socialLinks } from '../../FooterConsts/socialLinks'

import classes from './Footer.module.scss'

export const Footer = () => {

    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.footer_inner}>
                    <address className={classes.footer_contact}>
                        <FooterTitle titleType={FooterTitleType.h4}>Наши контакты</FooterTitle>
                        <div className={classes.footer_mailBox}>
                            <FooterLink href='e.marchenko@ihouse39.ru' linkType={FooterLinkType.email} />
                        </div>
                        <div className={classes.footer_city}>
                            <FooterTitle>Калининград</FooterTitle>
                            <p className={classes.footer_place}>Ул. Фрунзе 6В, офис 604/1</p>
                            <FooterLink href='89114524472' linkType={FooterLinkType.tel} />
                            <FooterLink href='84012508539' linkType={FooterLinkType.tel} />
                        </div>
                        <div className={classes.footer_city}>
                            <FooterTitle>Санкт-Петербург</FooterTitle>
                            <p className={classes.footer_place}>Набережная канала Грибоедова, дом 126, лит.А., пом.6-Н.</p>
                            <FooterLink href='89118511037' linkType={FooterLinkType.tel} />
                        </div>
                    </address>
                    <div className={classes.footer_social}>
                        <FooterTitle titleType={FooterTitleType.h4}>Наши новости</FooterTitle>
                        <div className={classes.footer_socialLinksList}>
                            {socialLinks.map(socialLink => (
                                <FooterLink
                                    href={socialLink.href}
                                    linkType={FooterLinkType.social}
                                    imageSrc={socialLink.imageSrc}
                                    key={socialLink.link}
                                >
                                    {socialLink.link}
                                </FooterLink>
                            ))}
                        </div>
                    </div>
                    <FooterSubscribe
                        className={classes.footer_subscribe}
                        title='Подписаться на рассылку'
                    />
                </div>
            </Container>
            <div className={classes.footer_copyrighting}>
                © 2021-2023    Компания iHouse
            </div>
        </footer>
    )
}