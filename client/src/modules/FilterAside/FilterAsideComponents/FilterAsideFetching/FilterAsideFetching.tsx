import { memo, useEffect } from 'react'
import { IGetAllJSON, brandStore, goodStore } from '../../../../store';
import { ICategoryJSON, IType } from '../../../../store/GoodStore';
import useRequest from '../../../../utils/hooks/useRequest';
import { fetchCategory } from '../../../../http/CategoryAPI';
import { IBrandTable } from '../../../../store/BrandStore';
import { fetchBrand } from '../../../../http/BrandAPI';
import { fetchTypesByCategory } from '../../../../http/TypeAPI';

import Title from '../../../../UI/Title/Title';
import Loader from '../../../../UI/Loader/Loader';
interface IFilterAsideFetching {
    categoryId: number | undefined;
}
export const FilterAsideFetching = memo((props: IFilterAsideFetching) => {
    const { categoryId } = props
    const [
        categories,
        categoriesIsLoading,
        categoriesError
    ] = useRequest<IGetAllJSON<ICategoryJSON>>(fetchCategory);
    const [
        brands,
        brandsIsLoading,
        brandsError
    ] = useRequest<IGetAllJSON<IBrandTable>>(fetchBrand);
    const [
        type,
        typeIsLoading,
        typeError, ,
        setTypeCategoryId
    ] = useRequest<IGetAllJSON<IType>, number>(fetchTypesByCategory, undefined, false);
    useEffect(() => {
        setTypeCategoryId(categoryId ?? -1)
    }, [categoryId])
    useEffect(() => {
        if (categories?.rows && !goodStore.categories?.rows) {
                goodStore.setCategories(categories)
        }
        if (brands?.rows && !brandStore.brands?.rows) {
                brandStore.setBrands(brands)
        }
        if (type) {
                goodStore.setTypes(type)
        }
    }, [categories, brands, type])
    // if (categoriesIsLoading || brandsIsLoading) return <Loader />
    // if (categoriesError || brandsError || typeError) {
    //     return <Title>Ошибка подключения: {categoriesError?.message ?? 400}</Title>
    // }
    return null;
})