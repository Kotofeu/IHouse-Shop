import { memo, FC } from 'react'

import Container from '../../../../components/Container/Container'
import { NavLink } from 'react-router-dom'

import logoImage from '../../../../assets/icons/IH-logo.svg'
import catalogImage from '../../../../assets/icons/Catalog.svg'
import aboutImage from '../../../../assets/icons/AboutUs.svg'
import favouritesImage from '../../../../assets/icons/Favourites.svg'
import basketImage from '../../../../assets/icons/Basket.svg'
import defaultUserImage from '../../../../assets/icons/User-icon.svg'
import ArrowImage from '../../../../assets/icons/Arrow.svg'

import classes from './Header.module.scss'


export const Header: FC = memo(() => {
  const searchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.headerInner}>
          <NavLink className={classes.logoLink} to='/'>
            <img className={classes.logoImage} src={logoImage} alt='IHouse Shop company' />
          </NavLink>
          <nav className={classes.headerNavigation}>
            <div className={classes.linkButtonns}>
              <NavLink className={classes.headerButtonLink} to='/catalog'>
                <img className={classes.buttonLinkImage} src={catalogImage} alt='catalog' />
                <span className={classes.buttonLinkTitle}>Каталог</span>
              </NavLink>
              <NavLink className={classes.headerButtonLink} to='/about'>
                <img className={classes.buttonLinkImage} src={aboutImage} alt='about us' />
                <span className={classes.buttonLinkTitle}>О нас</span>
              </NavLink>
            </div>
            <form className={classes.searchForm} onSubmit={searchForm}>
              <input className={classes.searchInput} type='text' autoComplete="off" title='Поле поиска' />
              <button className={classes.searchButton} type='submit' title='Поиск'>Поиск</button>
            </form>
            <div className={classes.linkButtonns}>
              <NavLink className={classes.headerButtonLink} to='/favourites'>
                <img className={classes.buttonLinkImage} src={favouritesImage} alt='favourites' />
                <span className={classes.buttonLinkTitle}>Избранное</span>
              </NavLink>
              <NavLink className={classes.headerButtonLink} to='/basket'>
                <img className={classes.buttonLinkImage} src={basketImage} alt='basket' />
                <span className={classes.buttonLinkTitle}>Корзина</span>
              </NavLink>
            </div>

          </nav>
          <div className={classes.userBox} onClick={() => console.log('user')}>
            <img className={classes.userImage} src={defaultUserImage} alt='user' />
            <img className={classes.arrowImage} src={ArrowImage} alt="arrow" />
          </div>

        </div>
      </Container>
    </header>
  )
})
