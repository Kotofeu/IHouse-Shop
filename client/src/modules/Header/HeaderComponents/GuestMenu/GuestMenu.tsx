import { memo, FC } from 'react'
import classes from './GuestMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
interface IGuestMenu {
  onExitClick: () => void;
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
  const { onExitClick, isOpen } = props
  return (
    <AnimatePresence>
      {isOpen && <motion.div
        className={classes.guestMenu}
        initial={animationVariant.close}
        exit={animationVariant.close}
        animate={animationVariant.open}
      >
        <NavLink className={classes.guestMenu_link} to={'/'}>Мои оценки</NavLink>
        <NavLink className={classes.guestMenu_link} to={'/'}>Настройки</NavLink>
        <button className={classes.guestMenu_button} type='button' onClick={onExitClick}>Выйти</button>
      </motion.div>
      }

    </AnimatePresence>

  )
})

export default GuestMenu