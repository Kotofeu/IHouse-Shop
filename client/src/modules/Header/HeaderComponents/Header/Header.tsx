import { memo, FC } from 'react'
import { motion } from 'framer-motion'
import classes from './Header.module.scss'
import HeaderLink from '../HeaderLink/HeaderLink'



export const Header = () => {
  const links = [
    {
      to: '/',
      content: 'Главная'
    },
    {
      to: '/shop',
      content: 'Магазин'
    },
    {
      to: '/about',
      content: 'О нас'
    },
  ]
  return (
    <header>
      <nav className={classes.navLinks}>
        {links.map((item) => <HeaderLink to={item.to} key={item.content}>{item.content}</HeaderLink>)}

      </nav>

    </header>
  )
}
