import { useState, ChangeEvent, useEffect, useCallback, memo } from 'react'
import { goodStore } from '../../../../store';
import { IGoodGetParams } from '../../../../store/GoodStore';
import { FilterAsideFetching } from '../FilterAsideFetching/FilterAsideFetching';


import Loader from '../../../../UI/Loader/Loader';
import Title from '../../../../UI/Title/Title';
import { FilterAsideAccordions } from '../FilterAsideAccordions/FilterAsideAccordions';
import { useLocation, useNavigate } from 'react-router-dom';
import { createQueryParam } from '../../FilterAsideHelpers/createQueryParam';
import { BRAND_ID, CATEGORY_ID, MAX_PRICE, MIN_PRICE, NAME, TYPE_ID } from '../../../../utils/const/getGoodQueryParams';

import classes from './FilterAside.module.scss'
import useDebounce from '../../../../utils/hooks/useDebounce';
import Input from '../../../../UI/Input/Input';
import { RangeSlider } from '../../../../components/RangeSlider/RangeSlider';

export const FilterAside = memo(() => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const navigate = useNavigate();

    const queryParamsToNumber = (param: string): number | undefined => {
        const value = queryParams.get(param);
        return value ? Number(value) : undefined;
    };

    const [fields, setFields] = useState<IGoodGetParams>({
        brandId: queryParamsToNumber(BRAND_ID),
        categoryId: queryParamsToNumber(CATEGORY_ID),
        typeId: queryParamsToNumber(TYPE_ID),
        minPrice: queryParamsToNumber(MIN_PRICE),
        maxPrice: queryParamsToNumber(MAX_PRICE),
        name: queryParams.get(NAME)?.toString() ?? undefined,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const debouncedFields = useDebounce(fields, 500);

    useEffect(() => {
        const query = [
            createQueryParam(BRAND_ID, debouncedFields.brandId),
            createQueryParam(CATEGORY_ID, debouncedFields.categoryId),
            createQueryParam(TYPE_ID, debouncedFields.typeId),
            createQueryParam(MIN_PRICE, debouncedFields.minPrice),
            createQueryParam(MAX_PRICE, debouncedFields.maxPrice),
            createQueryParam(NAME, debouncedFields.name),
        ].filter((part) => !!part).join('&');
        navigate(`?${query}`);
        goodStore.setGoodGetParameters({
            ...debouncedFields,
            orderBy: goodStore.orderBy,
            limit: goodStore.limit,
            page: goodStore.page
        });
    }, [debouncedFields, goodStore.limit, goodStore.page]);



    const onChangeInputHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setFields((prev) => ({
                ...prev,
                [event.target.name]: event.target.value ?? undefined
            }));
        },
        []
    );

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
    const [range, setRange] = useState({min: fields.minPrice || 0, max: fields.maxPrice || 99999});

    return (
        <aside className={classes.filterAside}>
            <FilterAsideFetching
                categoryId={fields.categoryId}
                setIsLoading={setIsLoading}
                setError={setError}
            />
            {isLoading
                ? <Loader />
                : <>
                    <div className={classes.filterAside_nameinputBox}>
                        <Input
                            placeholder='Название товара'
                            className={classes.filterAside_nameInput}
                            name={NAME}
                            value={fields.name || ''}
                            onChange={onChangeInputHandler}
                        />
                    </div>
                    <RangeSlider
                        max={9999}
                        min={0}
                        value={range}
                        onChange={setRange}
                    />
                    {
                        !error ?
                            <>
                                <FilterAsideAccordions
                                    fields={fields}
                                    onChangeSelectorHandler={onChangeSelectorHandler}
                                />
                            </>
                            : null
                    }
                    {error
                        ? <Title className={classes.filterAside_error}>{error}</Title>
                        : null
                    }
                </>}

        </aside>
    );
}); 