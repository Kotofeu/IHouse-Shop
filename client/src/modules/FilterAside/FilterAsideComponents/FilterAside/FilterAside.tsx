
import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { brandStore, goodStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import { IGoodGetParams } from '../../../../store/GoodStore';
import Title from '../../../../UI/Title/Title';
import { FilterAsideFetching } from '../FilterAsideFetching/FilterAsideFetching';

import classes from './FilterAside.module.scss'
import Accardion from '../../../../components/Accardion/Accardion';
import { FilterAsideCheckbox } from '../FilterAsideCheckbox/FilterAsideCheckbox';
import { FilterTitle } from '../FilterTitle/FilterTitle';
export const FilterAside = observer(() => {
    const [isTypesOpen, setIsTypesOpen] = useState<boolean>(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
    const [isBrandsOpen, setIsBrandsOpen] = useState<boolean>(false);
    const [fields, setFields] = useState<IGoodGetParams>({
        typeId: undefined,
        categoryId: undefined,
        brandId: undefined
    });

    useEffect(() => {
        goodStore.setGoodGetParameters(fields)
    }, [fields])

    const onChangeSelectorHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const validValue = event.target.checked ? +event.target.value : undefined
        setFields(prev => ({ ...prev, [event.target.name]: validValue }))
        if (event.target.name === "categoryId") {
            setFields(prev => ({ ...prev, typeId: undefined }))
        }
    }, []);
    return (
        <aside className={classes.filterAside}>
            <FilterAsideFetching categoryId={fields.categoryId} />
            <Accardion
                className={classes.filterAside_accardion}
                titleElement={(
                    <FilterTitle
                        className={classes.filterAside_title}
                        hideFilter={setIsBrandsOpen}
                        title='Бренд'
                    />
                )}
                isMouseReact={false}
                isOpen={isBrandsOpen}
                setIsOpen={setIsBrandsOpen}
                items={brandStore.brands?.rows || []}
                renderItem={item =>
                (
                    <FilterAsideCheckbox
                        className={classes.filterAside_checkbox}
                        key={item.id}
                        name='brandId'
                        value={item.id}
                        isChecked={item.id === fields.brandId}
                        onChange={onChangeSelectorHandler}
                        title={item.name}
                    />
                )
                }
            />

            <Accardion
                className={classes.filterAside_accardion}
                titleElement={(
                    <FilterTitle
                        className={classes.filterAside_title}
                        hideFilter={setIsCategoriesOpen}
                        title='Категория товара'
                    />
                )}
                isMouseReact={false}
                isOpen={isCategoriesOpen}
                setIsOpen={setIsCategoriesOpen}
                items={goodStore.categories?.rows || []}
                renderItem={item =>
                (
                    <FilterAsideCheckbox
                        className={classes.filterAside_checkbox}
                        key={item.id}
                        name='categoryId'
                        value={item.id}
                        isChecked={item.id === fields.categoryId}
                        onChange={onChangeSelectorHandler}
                        title={item.name}
                    />
                )
                }
            />
            {
                goodStore.types?.rows.length ?
                    <Accardion
                        className={classes.filterAside_accardion}
                        titleElement={(
                            <FilterTitle
                                className={classes.filterAside_title}
                                hideFilter={setIsTypesOpen}
                                title='Категория товара'
                            />
                        )}
                        isMouseReact={false}
                        isOpen={isTypesOpen}
                        setIsOpen={setIsTypesOpen}
                        items={goodStore.types?.rows || []}
                        renderItem={item =>
                        (
                            <FilterAsideCheckbox
                                className={classes.filterAside_checkbox}
                                key={item.id}
                                name='typeId'
                                value={item.id}
                                isChecked={item.id === fields.typeId}
                                onChange={onChangeSelectorHandler}
                                title={item.name}
                            />
                        )
                        }
                    />
                    : null
            }
        </aside>
    )
})
