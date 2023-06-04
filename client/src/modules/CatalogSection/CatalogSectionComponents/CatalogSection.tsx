import { useEffect, useState } from 'react'
import SectionList from '../../../components/SectionList/SectionList'
import classes from './CatalogSection.module.scss'
import { observer } from 'mobx-react-lite'
import useRequest from '../../../utils/hooks/useRequest'
import { IGoodGetParams, IGoodJSON, goodStore } from '../../../store/GoodStore'
import { IGetAllJSON } from '../../../store'
import { fetchGood } from '../../../http/GoodAPI'
import { GoodCard } from '../../../components/GoodCard'
export const CatalogSection = observer(() => {
    const [
        goods,
        isGoodsLoading,
        goodsError, ,
        setGoodParam
    ] = useRequest<IGetAllJSON<IGoodJSON>, IGoodGetParams>(fetchGood, goodStore.goodGetParameters)
    useEffect(() => {
        if (goods) {
            goodStore.setGoods(goods)
        }
    }, [goods])
    useEffect(() => {
        if (goodStore.goodGetParameters) {
            setGoodParam(goodStore.goodGetParameters)
        }
    }, [goodStore.goodGetParameters])

    return (
        <SectionList
            className={classes.catalogSection}
            listClassName={classes.catalogSection_list}
            title="Каталог товаров"
            error={""}
            emptySubtitle='Ничего не найдено'
            isLoading={isGoodsLoading}
            items={goodStore.goods?.rows || []}
            renderItem={(item: IGoodJSON) => (
                <GoodCard
                    className={classes.catalogSection_goodCard}
                    {...item}
                    key={item.id}
                />
            )}
        />
    )
})
