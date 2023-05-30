import { makeAutoObservable } from "mobx";
import { IBaseTable, IGetAllJSON, IGoodToUser } from "./index";
import { IGoodJSON } from "./GoodStore";
export interface IBasket extends IBaseTable, IGoodToUser {
    count: number;
    good: IGoodJSON;
}
export class BasketStore {
    private _basket: IGetAllJSON<IBasket> | null = null;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    setBasket(basket: IGetAllJSON<IBasket>) {
        this._basket = basket
    }
    get basket() {
        return this._basket
    }

}
