import { memo } from 'react'
import { observer } from 'mobx-react-lite'

import Category from '../Category/Category'

import { goodStore } from '../../../../store'
import otherImage from '../../../../assets/icons/other.svg'

import classes from './CategoriesNavigation.module.scss'

export const CategoriesNavigation = memo(observer(() => {

  return (
    <nav className={classes.categories}>
      {
        goodStore.categories
          ? goodStore.categories.rows.map((category) => (
            <Category
              categoryName={category.name}
              imageSrc={`${process.env.REACT_APP_API_URL}${category.image}`}
              id={category.id}
              key={category.id}
              types={category.types} />
          ))
          : null
      }
      <Category
        categoryName="Другое"
        imageSrc={otherImage}
        key="Другое"/>
    </nav>
  )
}))
