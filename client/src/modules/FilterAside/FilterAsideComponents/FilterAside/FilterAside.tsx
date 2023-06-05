import { useState, ChangeEvent, useEffect, useCallback, memo} from 'react'
import { goodStore } from '../../../../store';
import { IGoodGetParams } from '../../../../store/GoodStore';
import { FilterAsideFetching } from '../FilterAsideFetching/FilterAsideFetching';


import classes from './FilterAside.module.scss'
import Loader from '../../../../UI/Loader/Loader';
import Title from '../../../../UI/Title/Title';
import { FilterAsideAccordions } from '../FilterAsideAccordions/FilterAsideAccordions';


export const FilterAside = memo(() => {
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
                !error && !isLoading
                    ? <FilterAsideAccordions
                        fields={fields}
                        onChangeSelectorHandler={onChangeSelectorHandler}
                    />
                    : null
            }
            {
                error
                    ? <Title className={classes.filterAside_error}>{error}</Title>
                    : null
            }
        </aside>
    );
}); 