import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './HeaderButton.module.scss'

interface IHeaderButton {
  imageSrc: string,
  title: string,
  link: string,
  className?: string;
}
const HeaderButton: FC<IHeaderButton> = memo((props) => {
  const { imageSrc, title, link, className } = props
  return (
    <NavLink className={[classes.headerButtonLink, className].join(' ')} to={link}>
      <img className={classes.buttonLinkImage} src={imageSrc} alt={title} />
      <span className={classes.buttonLinkTitle}>{title}</span>
    </NavLink>)
})

export default HeaderButton