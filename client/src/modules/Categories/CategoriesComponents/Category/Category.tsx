import { memo, FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'

import arrowImage from '../../../../assets/icons/Arrow.svg'
import classes from './Category.module.scss'
import Accardion from '../../../../components/Accardion/Accardion'
interface IGoodType {
    id: number,
    name: string,
    categoryId?: number,
}
interface ICategory {
    id?: number,
    categoryName: string,
    imageSrc: string,
    types?: IGoodType[]
}
const Category: FC<ICategory> = memo((props) => {
    const { id, categoryName, imageSrc, types } = props
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    return (
        <Accardion
            className={classes.category}
            listClassName={classes.category_typeList}
            titleElement={(
                <NavLink
                    className={classes.category_link}
                    to={`/catalog/${id ?? ''}`}
                >
                    <img className={classes.category_image} src={imageSrc} alt={categoryName} />
                    <span className={classes.category_text}>{categoryName}</span>
                </NavLink>
            )}
            items={types || []}
            isOpen={isCategoryOpen}
            isMouseReact={true}
            setIsOpen={setIsCategoryOpen}
            renderItem={(item, index) =>
            (
                <div className={classes.category_type} key={item.id}>
                    <NavLink
                        className={classes.category_typeLink}
                        to={`/catalog/${id}/${item.name}`}
                    >
                        {item.name}
                    </NavLink>
                </div>
            )
            }
        />
    )
})

export default Category