import { IComprehensiveOffer } from "../store/ComprehensiveOfferStore";
import { $authHost, $host, baseComprehensiveOffer } from "./index";


export const postComprehensiveOffer = async (comprehensiveOffer: IComprehensiveOffer) => {
    const { data } = await $authHost.post(baseComprehensiveOffer, { ...comprehensiveOffer })
    return data
}
export const fetchComprehensiveOffer = async () => {
    const { data } = await $host.get(baseComprehensiveOffer)
    return data
}

export const fetchOneComprehensiveOffer = async (id: number) => {
    const { data } = await $host.get(baseComprehensiveOffer + id)
    return data
}
export const deleteComprehensiveOffer = async (id: number) => {
    const { data } = await $authHost.delete(baseComprehensiveOffer, { data: { id } });
    return data;
}
export const deleteGoodInComprehensiveOffer = async (id: number) => {
    const { data } = await $authHost.delete(`${baseComprehensiveOffer}good`, { data: { id } });
    return data;
}