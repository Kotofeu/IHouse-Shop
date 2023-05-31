import { memo, useEffect} from 'react'
import { observer } from 'mobx-react-lite'

import Category from '../Category/Category'

import { IGetAllJSON, goodStore } from '../../../../store'
import otherImage from '../../../../assets/icons/other.svg'

import classes from './CategoriesNavigation.module.scss'
import useRequest from '../../../../utils/hooks/useRequest'
import { ICategoryJSON } from '../../../../store/GoodStore'
import { fetchCategory } from '../../../../http/CategoryAPI'

export const CategoriesNavigation = observer(() => {
  const [
    categories,
    categoriesIsLoading,
    categoriesError
  ] = useRequest<IGetAllJSON<ICategoryJSON>>(fetchCategory());

  useEffect(() => {
    if (categories && (categories !== goodStore.categories)) {
      goodStore.setCategories(categories)
    }
  }, [categories])
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
})