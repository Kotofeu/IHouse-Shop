import { memo, FC } from 'react'

import Container from '../../../../components/Container/Container'
import { NavLink } from 'react-router-dom'
import HeaderButton from '../HeaderButton/HeaderButton'
import HeaderSearchForm from '../HeaderSearchForm/HeaderSearchForm'

import logoImage from '../../../../assets/icons/IH-logo.svg'
import catalogImage from '../../../../assets/icons/Catalog.svg'
import aboutImage from '../../../../assets/icons/AboutUs.svg'
import favouritesImage from '../../../../assets/icons/Favourites.svg'
import basketImage from '../../../../assets/icons/Basket.svg'
import testIam from '../../../../assets/testIam.jpg'

import classes from './Header.module.scss'
import HeaderUser from '../HeaderUser/HeaderUser'

export const Header: FC = memo(() => {

  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.headerInner}>
          <NavLink className={classes.logoLink} to='/'>
            <img className={classes.logoImage} src={logoImage} alt='IHouse Shop company' />
          </NavLink>
          <nav className={classes.headerNavigation}>
            <div className={classes.linkButtonns}>
              <HeaderButton
                className={classes.headerLink}
                imageSrc={catalogImage}
                title='Каталог'
                link='/catalog'
              />
              <HeaderButton
                className={classes.headerLink}
                imageSrc={aboutImage}
                title='О нас'
                link='/about'
              />
            </div>
            <HeaderSearchForm
              className={classes.headerSearchForm}
              inputTitle='Поле поиска'
              buttonTitle='Поиск'
              inputType='text'

            />
            <div className={classes.linkButtonns}>
              <HeaderButton
                className={classes.headerLink}
                imageSrc={favouritesImage}
                title='Избранное'
                link='/about'
              />
              <HeaderButton
                className={classes.headerLink}
                imageSrc={basketImage}
                title='Корзина'
                link='/basket'
              />
            </div>
          </nav>
          <HeaderUser className={classes.headerUser} userImage={testIam}/>

        </div>
      </Container>
    </header>
  )
})
