import { BrandStore } from "./BrandStore";
import { ComprehensiveOfferStore } from "./ComprehensiveOfferStore";
import { GoodStore } from "./GoodStore";
import { RatingStore } from "./RatingStore";
import { UserStore } from "./UserStore";

export interface IBaseTable {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IGetAllJSON<T> {
    count: number;
    rows: [T];
}
export interface IGoodToUser {
    userId: number;
    goodId: number;
}

export interface IUniversalTable extends IBaseTable {
    name?: string;
    image?: string | null;
    goodId?: number;
    categoryId?: number;
}

export enum GoodOrderBy {"name", "price", "id"}

export const goodStore = new GoodStore()
export const userStore = new UserStore()
export const brandStore = new BrandStore()
export const comprehensiveOfferStore = new ComprehensiveOfferStore()
export const ratingStore = new RatingStore()

