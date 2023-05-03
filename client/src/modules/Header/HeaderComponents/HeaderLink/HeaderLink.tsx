import { FC, ReactNode, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import classes from './HeaderLink.module.scss'
import HeaderActiveLine from '../HeaderActiveLine/HeaderActiveLine'

interface IHeaderLinkProps {
  className?: string,
  to: string,
  children: ReactNode,
}
const HeaderLink: FC<IHeaderLinkProps> = memo((props) => {
  const { to, children, className} = props
  return (
    <NavLink
      className=
      {
        ({ isActive }) =>
          [
            classes.headerLink,
            isActive ? classes.active : '',
            className? className: ''
          ].join(' ')
      }
      to={to}
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && <HeaderActiveLine />}
        </>
      )}
    </NavLink>
  )
})

export default HeaderLink