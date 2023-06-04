import { memo, FC, MouseEvent } from 'react'
import classes from './GuestMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
interface IGuestMenu {
  className?: string;
  onExitClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean
}
const animationVariant = {
  "open": {
    scaleX: 1,
    scaleY: 1,
    opacity: 1
  },
  "close": {
    scaleX: 0,
    scaleY: 0,
    opacity: 0
  }
}
const GuestMenu: FC<IGuestMenu> = memo((props) => {
  const { onExitClick, isOpen, className = '' } = props
  return (
    <AnimatePresence>
      {isOpen && <motion.div
        className={[classes.guestMenu, className].join(' ')}
        initial={animationVariant.close}
        exit={animationVariant.close}
        animate={animationVariant.open}
      >
        <nav className={classes.guestMenu_nav}>
          <NavLink className={classes.guestMenu_link} to={'/'}>
            Мои отзывы
          </NavLink>
          <NavLink className={classes.guestMenu_link} to={'/'}>
            Настройки
          </NavLink>
        </nav>

        <button
          className={classes.guestMenu_button}
          type='button'
          onClick={onExitClick}
        >
          Выйти
        </button>
      </motion.div>
      }

    </AnimatePresence>

  )
})

export default GuestMenu