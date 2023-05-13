import React from 'react'

import lightImage from '../../../../assets/icons/Bulb.svg'
import powerSocketImage from '../../../../assets/icons/Power-socket.svg'
import curtainImage from '../../../../assets/icons/Curtains.svg'
import moduleImage from '../../../../assets/icons/module.svg'

import classes from './CategoriesNavigation.module.scss'
import Category from '../Category/Category'

export const CategoriesNavigation = () => {
  const categories = [
    {
      id: 1,
      categoryName: 'Освещение',
      imageSrc: lightImage,
      types: [
        {
          id: 1,
          typeName: 'Димеры',
        },
        {
          id: 2,
          typeName: 'RGB-лампы',
        },
        {
          id: 3,
          typeName: 'Точечный свет',
        }
        ,
        {
          id: 4,
          typeName: 'Лампы',
        }
      ]
    },
    {
      id: 2,
      categoryName: 'Розетки',
      imageSrc: powerSocketImage,
      types: [
        {
          id: 5,
          typeName: 'Европейская',
        },
        {
          id: 6,
          typeName: 'USB-розетка',
        },
        {
          id: 7,
          typeName: 'ТВ розетка BBTV',
        }
      ]
    },
    {
      id: 3,
      categoryName: 'Шторы',
      imageSrc: curtainImage,
      types: [
        {
          id: 8,
          typeName: 'Римская',
        },
        {
          id: 9,
          typeName: 'Классическая',
        }
      ]
    },

    {
      id: 4,
      categoryName: 'Модули',
      imageSrc: moduleImage,
      types: [
        {
          id: 10,
          typeName: 'Блок питания',
        },
        {
          id: 11,
          typeName: 'Модуль штор',
        },
        {
          id: 12,
          typeName: 'Модуль реле',
        },
        
      ]
    },
    {
      id: 5,
      categoryName: 'Другое',
      imageSrc: moduleImage,
    }
  ]
  return (
    <nav className={classes.categories}>
      {
        categories.map((category) => (
          <Category {...category} key={category.id}></Category>
        ))
      }
    </nav>
  )
}

