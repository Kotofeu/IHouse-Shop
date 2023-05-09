import { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'
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
const Category: FC<ICategory> = (props) => {
    const { id, categoryName, imageSrc, types } = props
    return (
        <div className={classes.category}>
            <NavLink
                className={classes.categoryLink}
                to={`/catalog/${categoryName}`}
            >
                <img className={classes.categoryImage} src={imageSrc} alt={categoryName} />
                <span className={classes.categoryText}>{categoryName}</span>
            </NavLink>
            {
                types
                    ? <div className={classes.typeList}>
                        {
                            types.map((type) => (
                                <NavLink
                                    className={classes.typeLink}
                                    to={`/catalog/${categoryName}/${type.typeName}`}
                                    key={type.id}
                                >
                                    {type.typeName}
                                </NavLink>
                            ))
                        }
                    </div>
                    : null
            }

        </div>
    )
}

export default Category