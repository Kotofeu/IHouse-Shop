import { memo, FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'
import defaultUserImage from '../../../../assets/icons/User-icon.svg'
import ArrowImage from '../../../../assets/icons/Arrow.svg'

import classes from './HeaderUser.module.scss'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import { userStore } from '../../../../store'
import AuthModal from '../AuthModal/AuthModal'

interface IHeaderUser {
    className?: string,
    userImage?: string,

}
const HeaderUser: FC<IHeaderUser> = observer(
    ({ className = '', userImage }) => {
        const isUserAuth = userStore.isAuth

        const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
        const closeModal = () => {
            setIsAuthOpen(false)
        }
        return (
            <div
                className={[classes.user, className].join(' ')}
            >
                <div
                    className={classes.user_openForm}
                    onClick={() => setIsAuthOpen(true)}
                >
                    <ServerImage
                        className={classes.user_image}
                        src={userImage}
                        altSrc={defaultUserImage}
                        alt='user'
                    />
                    {
                        isUserAuth &&
                        <img
                            className={classes.user_arrow}
                            src={ArrowImage}
                            alt="arrow"
                        />

                    }

                </div>
                {
                    !isUserAuth
                        ? <AuthModal isOpen={isAuthOpen} closeModal={closeModal} />
                        : null
                }
            </div>
        )
    }
)

export default HeaderUser