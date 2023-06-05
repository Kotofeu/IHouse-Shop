import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { brandStore, goodStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import { IGoodGetParams } from '../../../../store/GoodStore';
import { FilterAsideFetching } from '../FilterAsideFetching/FilterAsideFetching';

import Accordion from '../../../../components/Accordion/Accordion';
import { FilterAsideCheckbox } from '../FilterAsideCheckbox/FilterAsideCheckbox';
import { FilterTitle } from '../FilterTitle/FilterTitle';
import classes from './FilterAside.module.scss'
import Loader from '../../../../UI/Loader/Loader';
import Title from '../../../../UI/Title/Title';
interface IUniversalItem {
    id: number;
    name: string;
    image?: string;
    categoryId?: number;
}

export const FilterAside = observer(() => {
    const [isTypesOpen, setIsTypesOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const [fields, setFields] = useState<IGoodGetParams>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        goodStore.setGoodGetParameters(fields);
    }, [fields]);

    const onChangeSelectorHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const validValue = event.target.checked ? +event.target.value : undefined;
            const { name } = event.target;
            setFields((prev) => ({
                ...prev,
                [name]: validValue,
                ...(name === "categoryId" && { typeId: undefined })
            }));
        },
        []
    );

    const accordions = [
        {
            name: "Бренд",
            isOpen: isBrandsOpen,
            setIsOpen: setIsBrandsOpen,
            items: brandStore.brands?.rows || [],
            renderItems: (item: IUniversalItem) => (
                <FilterAsideCheckbox
                    key={item.id}
                    name="brandId"
                    value={item.id}
                    isChecked={item.id === fields.brandId}
                    onChange={onChangeSelectorHandler}
                    title={item.name}
                    className={classes.filterAside_checkbox}
                />
            )
        },
        {
            name: "Категория товара",
            isOpen: isCategoriesOpen,
            setIsOpen: setIsCategoriesOpen,
            items: goodStore.categories?.rows || [],
            renderItems: (item: IUniversalItem) => (
                <FilterAsideCheckbox
                    key={item.id}
                    name="categoryId"
                    value={item.id}
                    isChecked={item.id === fields.categoryId}
                    onChange={onChangeSelectorHandler}
                    title={item.name}
                    className={classes.filterAside_checkbox}
                />
            )
        },
        {
            name: "Тип товара",
            isOpen: isTypesOpen,
            setIsOpen: setIsTypesOpen,
            items: goodStore.types?.rows || [],
            renderItems: (item: IUniversalItem) => (
                <FilterAsideCheckbox
                    key={item.id}
                    name="typeId"
                    value={item.id}
                    isChecked={item.id === fields.typeId}
                    onChange={onChangeSelectorHandler}
                    title={item.name}
                    className={classes.filterAside_checkbox}
                />
            )
        }
    ];

    return (
        <aside className={classes.filterAside}>
            <FilterAsideFetching
                categoryId={fields.categoryId}
                setIsLoading={setIsLoading}
                setError={setError}
            />
            {
                isLoading && <Loader />
            }
            {
                !error && !isLoading && accordions.length
                    ? accordions.map(({ name, isOpen, setIsOpen, items, renderItems }) => (
                        items?.length ? (
                            <Accordion
                                key={name}
                                className={classes.filterAside_accordion}
                                titleElement={
                                    <FilterTitle
                                        className={classes.filterAside_title}
                                        hideFilter={() => setIsOpen(v => !v)}
                                        title={name}
                                    />
                                }
                                isMouseReact={false}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                items={items}
                                renderItem={renderItems}
                            />
                        ) : null
                )) : null
            }
            {
                error
                ?<Title className={classes.filterAside_error}>{error}</Title>
                :null
            }
        </aside>
    );
}); 