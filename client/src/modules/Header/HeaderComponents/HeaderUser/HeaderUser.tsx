import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'
import defaultUserImage from '../../../../assets/icons/User-icon.svg'
import ArrowImage from '../../../../assets/icons/Arrow.svg'

import classes from './HeaderUser.module.scss'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import { userStore } from '../../../../store'
import AuthForm from '../AuthForm/AuthForm'
import Modal from '../../../../components/Modal/Modal'
import { IUser } from '../../../../store/UserStore'
import GuestMenu from '../GuestMenu/GuestMenu'

interface IHeaderUser {
    className?: string;

}
const HeaderUser: FC<IHeaderUser> = observer(
    ({ className = '' }) => {
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
        const IsUserAuth: boolean = userStore.isAuth
        const connetcion = (user: IUser | null) => {
            setIsModalOpen(false)
            userStore.setIsAuth(!!user)
            userStore.setUser(user)
            if (!user) localStorage.setItem('token', '')
        }
        const toggleModal = () => {
            setIsModalOpen(prev => !prev)
        }
        return (
            <div
                className={[classes.user, className].join(' ')}
            >
                <div
                    className={classes.user_openForm}
                    onClick={toggleModal}
                >
                    <ServerImage
                        className={classes.user_image}
                        src={userStore.user?.image || undefined}
                        altSrc={defaultUserImage}
                        alt='user'
                    />
                    {
                        IsUserAuth &&
                        <img
                            className={
                                [
                                    classes.user_arrow,
                                    isModalOpen ? classes.user_arrow___active : ''
                                ].join(' ')}
                            src={ArrowImage}
                            alt="arrow"
                        />

                    }

                </div>
                <div className={classes.user_menu}>
                    {
                        !IsUserAuth
                            ? <Modal selectedId={isModalOpen} closeModal={toggleModal}>
                                <AuthForm formClose={toggleModal} setUser={connetcion} />
                            </Modal>
                            : null
                    }
                    {
                        IsUserAuth
                            ? <GuestMenu isOpen={isModalOpen} onExitClick={() => connetcion(null)} />
                            : null
                    }
                </div>
            </div>
        )
    }
)

export default HeaderUser