import { memo, FC, useState } from 'react'

import defaultUserImage from '../../../../assets/icons/User-icon.svg'
import ArrowImage from '../../../../assets/icons/Arrow.svg'

import classes from './HeaderUser.module.scss'

interface IHeaderUser {
    className?: string,
    userImage?: string,

}
const HeaderUser: FC<IHeaderUser> = memo(
    (
        { className = '', userImage = defaultUserImage }
    ) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const openUser = ()  => {
            setIsOpen((prev) => (!prev))
            //Логика открытия окна пользователя
        }
        return (
            <div
                className={[classes.userBox, className].join(' ')}
                onClick={openUser}
            >
                <img
                    className={classes.userImage}
                    src={userImage}
                    alt='user' />
                <img
                    className={classes.arrowImage}
                    src={ArrowImage}
                    alt="arrow" />
            </div>
        )
    })

export default HeaderUser