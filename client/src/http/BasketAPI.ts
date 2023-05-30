import { $authHost, baseBasket } from "./index";

interface IPostGoodInBasket {
    goodId: number;
    count?: number
}
export const postBasket = async (basket: IPostGoodInBasket) => {
    const { data } = await $authHost.post(baseBasket, {...basket})
    return data
}
export const fetchBasket  = async () => {
    const { data } = await $authHost.get(baseBasket)
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