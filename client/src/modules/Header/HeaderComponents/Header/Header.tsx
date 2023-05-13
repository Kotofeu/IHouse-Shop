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
        <div className={classes.header_inner}>
          <NavLink className={classes.header_logo} to='/'>
            <img className={classes.header_logoImage} src={logoImage} alt='IHouse Shop company' />
          </NavLink>
          <nav className={classes.header_navigation}>
            <div className={classes.header_linkButtons}>
              <HeaderButton
                className={classes.header_link}
                imageSrc={catalogImage}
                title='Каталог'
                link='/catalog'
              />
              <HeaderButton
                className={classes.header_link}
                imageSrc={aboutImage}
                title='О нас'
                link='/about'
              />
            </div>
            <HeaderSearchForm
              className={classes.header_searchForm}
              inputTitle='Поле поиска'
              buttonTitle='Поиск'
              inputType='text'

            />
            <div className={classes.header_linkButtons}>
              <HeaderButton
                className={classes.header_link}
                imageSrc={favouritesImage}
                title='Избранное'
                link='/about'
              />
              <HeaderButton
                className={classes.header_link}
                imageSrc={basketImage}
                title='Корзина'
                link='/basket'
              />
            </div>
          </nav>
          <HeaderUser className={classes.header_user} userImage={testIam}/>

        </div>
      </Container>
    </header>
  )
})
