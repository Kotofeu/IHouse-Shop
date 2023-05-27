import { memo, FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'

import arrowImage from '../../../../assets/icons/Arrow.svg'
import classes from './Category.module.scss'
interface IGoodType {
    id: number,
    typeName: string
}
interface ICategory {
    id: number,
    categoryName: string,
    imageSrc: string,
    types?: IGoodType[]
}
const Category: FC<ICategory> = memo((props) => {
    const { id, categoryName, imageSrc, types } = props
    const [isCategoryHovered, setIsCategoryHovered] = useState<boolean>(false);
    const expandMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsCategoryHovered(prev => !prev)
    }
    return (
        <div
            className={classes.category}
            onMouseEnter={() => setIsCategoryHovered(true)}
            onMouseLeave={() => setIsCategoryHovered(false)}
        >
            <NavLink
                className={classes.category_link}
                to={`/catalog/${categoryName}`}
            >
                <img className={classes.category_image} src={imageSrc} alt={categoryName} />
                <span className={classes.category_text}>{categoryName}</span>
                {
                    types
                        ? <button
                            className={
                                [
                                    classes.category_openButton,
                                    isCategoryHovered ? classes.category_openButton___active : ""
                                ]
                                    .join(' ')
                            }
                            onClick={expandMenu}>
                                <img src={arrowImage} alt='arrow'></img>
                            </button> : null
                }

            </NavLink>
            <AnimatePresence initial={false}>
                {
                    types && isCategoryHovered
                        ? <motion.div
                            className={classes.category_typeList}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                        >
                            {
                                types.map((type) => (
                                    <div className={classes.category_type} key={type.id}>
                                        <NavLink
                                            className={classes.category_typeLink}
                                            to={`/catalog/${categoryName}/${type.typeName}`}
                                        >
                                            {type.typeName}
                                        </NavLink>
                                    </div>

                                ))
                            }
                        </motion.div>
                        : null
                }
            </AnimatePresence>
        </div>
    )
})

export default Category