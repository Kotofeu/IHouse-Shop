import { $authHost, baseBasket, baseFavourite } from "../../../http"


export const postBasket = async (goodId: number) => {
    const { data } = await $authHost.post(baseBasket, {goodId})
    return data
}
export const deleteBasket = async (goodId: number) => {
    const { data } = await $authHost.delete(baseBasket, {data: {goodId}})
    return data
}
export const isGoodInBasket = async (goodId: number) => {
    const { data } = await $authHost.get(`${baseBasket}find-good`, {params: {goodId}});
    return data;
}

export const postFavourite = async (goodId: number) => {
    const { data } = await $authHost.post(baseFavourite, {goodId})
    return data
}
export const deleteFavourite = async (goodId: number) => {
    const { data } = await $authHost.delete(baseFavourite, {data: {goodId}})
    return data
}
export const isGoodInFavourite = async (goodId: number) => {
    const { data } = await $authHost.get(`${baseFavourite}find-good`, {params: {goodId}});
    return data;
}