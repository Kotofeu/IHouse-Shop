import { memo, FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import defaultUserImage from '../../../../assets/icons/User-icon.svg'
import ArrowImage from '../../../../assets/icons/Arrow.svg'

import classes from './HeaderUser.module.scss'
import ServerImage from '../../../../UI/ServerImage/ServerImage'

interface IHeaderUser {
    className?: string,
    userImage?: string,

}
const HeaderUser: FC<IHeaderUser> = memo(
    (
        { className = '', userImage }
    ) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const openUser = () => {
            setIsOpen((prev) => (!prev))
            //Логика открытия окна пользователя
            console.log(isOpen)
        }
        return (
            <div
                className={[classes.user, className].join(' ')}
                onClick={openUser}
            >
                <ServerImage
                    className={classes.user_image}
                    src={userImage}
                    altSrc={defaultUserImage}
                    alt='user'
                />
                <img
                    className={classes.user_arrow}
                    src={ArrowImage}
                    alt="arrow" />
            </div>
        )
    }
)

export default HeaderUser