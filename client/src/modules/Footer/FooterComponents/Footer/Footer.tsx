import { FormEvent, useState, useCallback } from 'react'
import Container from '../../../../components/Container/Container'


import vkImage from '../../../../assets/icons/social/vk.svg'
import tgImage from '../../../../assets/icons/social/telegram_logo.svg'
import youtubeImage from '../../../../assets/icons/social/youtube.svg'
import whatsappImage from '../../../../assets/icons/social/whatsapp.svg'
import ourSiteImage from '../../../../assets/icons/social/IH-logo.svg'

import classes from './Footer.module.scss'
import Form from '../../../../components/Form/From'

export const Footer = () => {

    const [email, setEmail] = useState<string>('');

    const subscribeFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            //Отправка на сервер
        }, []
    )
    const subscribeFormChange = (event: FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.footer_inner}>
                    <address className={classes.footer_contact}>
                        <h4 className={
                            [
                                classes.footer_title,
                                classes.footer_title___h4
                            ]
                                .join(' ')
                        }>
                            Наши контакты
                        </h4>
                        <a className={classes.footer_mail} href="mailto:e.marchenko@ihouse39.ru">e.marchenko@ihouse39.ru</a>
                        <div className={classes.footer_city}>
                            <h5 className={
                                [
                                    classes.footer_title,
                                    classes.footer_title___h5
                                ]
                                    .join(' ')
                            }>
                                Калининград
                            </h5>
                            <p className={classes.footer_place}>Ул. Фрунзе 6В, офис 604/1</p>
                            <a className={classes.footer_phone} href="tel:89114524472">89114524472</a>
                            <a className={classes.footer_phone} href="tel:84012508539">84012508539</a>

                        </div>
                        <div className={classes.footer_city}>
                            <h5 className={
                                [
                                    classes.footer_title,
                                    classes.footer_title___h5
                                ]
                                    .join(' ')
                            }>
                                Санкт-Петербург
                            </h5>
                            <p className={classes.footer_place}>Набережная канала Грибоедова, дом 126, лит.А., пом.6-Н.</p>
                            <a className={classes.footer_phone} href="tel:89118511037">89118511037</a>

                        </div>
                    </address>
                    <div className={classes.footer_social}>
                        <h4 className={
                            [
                                classes.footer_title,
                                classes.footer_title___h4
                            ]
                                .join(' ')
                        }>
                            Наши новости
                        </h4>
                        <div className={classes.footer_socialLinksList}>
                            <a
                                className={classes.footer_socialLink}
                                href=""
                            >
                                <img
                                    className={classes.footer_socialImage}
                                    src={tgImage}
                                    alt='Telegram'
                                />
                                <span>Telegram</span>
                            </a>
                            <a
                                className={classes.footer_socialLink}
                                href=""
                            >
                                <img
                                    className={classes.footer_socialImage}
                                    src={youtubeImage} alt='YouTube'
                                />
                                <span>YouTube</span>
                            </a>
                            <a
                                className={classes.footer_socialLink}
                                href=""
                            >
                                <img
                                    className={classes.footer_socialImage}
                                    src={whatsappImage} alt='WhatsApp' />
                                <span>WhatsApp</span>
                            </a>
                            <a
                                className={classes.footer_socialLink}
                                href=""
                            >
                                <img
                                    className={classes.footer_socialImage}
                                    src={vkImage} alt='VK' />
                                <span>VK</span>
                            </a>
                            <a
                                className={classes.footer_socialLink}
                                href=""
                            >
                                <img
                                    className={classes.footer_socialImage}
                                    src={ourSiteImage} alt='Наш сайт' />
                                <span>Наш сайт</span>
                            </a>
                        </div>
                    </div>
                    <div className={classes.footer_subscribe}>
                        <h4 className={
                            [
                                classes.footer_title,
                                classes.footer_title___h4
                            ]
                                .join(' ')
                        }>
                            Подписаться на рассылку
                        </h4>
                        <Form
                            className={classes.footer_subscribeForm}
                            onFormSubmit={subscribeFormSubmit}
                            inputValue={email}
                            inputType='text'
                            inputTitle='Поле электронной почты'
                            inputAutoComplete='off'
                            placeholder='Введите вашу почту'
                            inputOnChange={subscribeFormChange}
                            buttonTitle='Подписаться'
                        />
                    </div>

                </div>
            </Container>
            <div className={classes.footer_copyrighting}>
                © 2021-2023    Компания iHouse
            </div>
        </footer>
    )
}
///<a className={classes.footer_ourSite} href="https://ihouse39.ru/">Сайт компании</a>