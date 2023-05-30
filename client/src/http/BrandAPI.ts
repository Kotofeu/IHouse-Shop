import { IBaseTable, IUniversalTable } from "../store";
import { $authHost, $host, baseBrand } from "./index";

export const postBrand = async (brand: IBaseTable) => {
    const { data } = await $authHost.post(baseBrand, {...brand})
    return data
}
export const fetchBrand  = async () => {
    const { data } = await $host.get(baseBrand)
    return data
}
export const fetchOneBrand = async (id: number) => {
    const { data } = await $host.get(baseBrand + id)
    return data
}
export const deleteBrand = async (id: number) => {
    const { data } = await $authHost.delete(baseBrand, { data: { id } });
    return data;
}