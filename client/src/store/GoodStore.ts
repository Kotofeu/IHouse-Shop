import { makeAutoObservable } from "mobx";
import { IUser } from "./UserStore";
import { GoodOrderBy, IBaseTable, IGetAllJSON, IGoodToUser, IUniversalTable } from "./index.js";



export interface IGood extends IBaseTable {
    name: string;
    price: number;
    oldPrice: number | null;
    isPromotion: boolean | null;
    categoryId: number | null;
    typeId: number | null;
    brandId: number | null;
    good_images: IUniversalTable[];
    good_infos?: IGoodInfo[];
    ratings: IRating[];
    category: ICategory | null;
    type: IType | null;
    brand: IUniversalTable | null;
}
export interface IType extends IBaseTable {
    name: string;
    categoryId: number;
}
export interface IGoodInfo extends IBaseTable {
    name: string;
    description: string;
    goodId: number;
}
export interface ICategory extends IBaseTable {
    name: string;
    image: string;
    types?: IUniversalTable[];
}
export interface RatingImage extends IBaseTable {
    image: string;
    ratingId: number;
}
export interface IRating extends IBaseTable, IGoodToUser {
    rating: number;
    comment: null | string;
    user?: IUser;
    rating_images?: RatingImage[];
}



export interface IBasket extends IBaseTable, IGoodToUser {
    count: number;
    good: IGood;
}
export interface IFavourite extends IBaseTable, IGoodToUser {
    good: IGood;
}
export interface IComprehensiveOfferGoods extends IBaseTable {
    count: number;
    goodId: number;
    complexOfferId: number;
    good: IGood;
}

export interface IComprehensiveOffer extends IBaseTable {
    name: string;
    description: string;
    price: number;
    image: string;
    complex_offer_goods?: IComprehensiveOfferGoods[];
}


export class GoodStore {
    private _categories: IGetAllJSON<ICategory> | null = null;
    private _types: IGetAllJSON<IType> | null = null;
    private _brands: IGetAllJSON<IUniversalTable> | null = null;
    private _goods: IGetAllJSON<IGood> | null = null;
    private _ratings: IGetAllJSON<IRating> | null = null;
    private _comprehensiveOffers: IGetAllJSON<IComprehensiveOffer> | null = null

    private _basket: IGetAllJSON<IBasket> | null = null;
    private _favourite: IGetAllJSON<IFavourite> | null = null;

    // Параметры для запроса товаров
    private _page: number = 1
    private _limit: number = 10
    private _selectedCategoryId: number | null = null
    private _selectedTypeId: number | null = null
    private _selectedBrandId: number | null = null
    private _minPrice: number | null = 0
    private _maxPrice: number | null = 9999999

    private _name: string = ''

    private _orderBy: GoodOrderBy = GoodOrderBy.id

    private _isPromotion: boolean | null = null


    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setCategories(categories: IGetAllJSON<ICategory>) {
        this._categories = categories
    }
    setTypes(types: IGetAllJSON<IType>) {
        this._types = types
    }

    setBrands(brands: IGetAllJSON<IUniversalTable>) {
        this._brands = brands
    }

    setGoods(goods: IGetAllJSON<IGood>) {
        this._goods = goods
    }

    setRatings(ratings: IGetAllJSON<IRating>) {
        this._ratings = ratings
    }
    setComprehensiveOffers(comprehensiveOffers: IGetAllJSON<IComprehensiveOffer>) {
        this._comprehensiveOffers = comprehensiveOffers
    }
    setBasket(basket: IGetAllJSON<IBasket>) {
        this._basket = basket
    }
    setFavourite(favourite: IGetAllJSON<IFavourite>) {
        this._favourite = favourite
    }


    setPage(page: number) {
        this._page = page
    }

    setLimit(limit: number) {
        this.setPage(1)
        this._limit = limit
    }
    setSelectedCategoryId(selectedCategoryId: number | null) {
        this.setPage(1)
        this._selectedCategoryId = selectedCategoryId
    }
    setSelectedTypeId(selectedTypeId: number | null) {
        this.setPage(1)
        this._selectedTypeId = selectedTypeId
    }
    setSelectedBrandId(selectedBrandId: number | null) {
        this.setPage(1)
        this._selectedBrandId = selectedBrandId
    }
    setMinPrice(minPrice: number) {
        this.setPage(1)
        this._minPrice = minPrice
    }
    setMaxPrice(maxPrice: number) {
        this.setPage(1)
        this._maxPrice = maxPrice
    }
    setName(name: string) {
        this.setPage(1)
        this._name = name
    }
    setOrderBy(orderBy: GoodOrderBy) {
        this.setPage(1)
        this._orderBy = orderBy
    }
    setIsPromotion(isPromotion: boolean | null) {
        this.setPage(1)
        this._isPromotion = isPromotion
    }

    dropFields() {
        this.setPage(1);
        this.setLimit(10);
        this.setSelectedBrandId(null);
        this.setSelectedCategoryId(null);
        this.setSelectedTypeId(null);
        this.setMinPrice(0);
        this.setMaxPrice(9999999);
        this.setName('');
        this.setOrderBy(GoodOrderBy.id);
        this.setIsPromotion(null);
    }
    get categories() {
        return this._categories;
    }
    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get goods() {
        return this._goods
    }

    get ratings() {
        return this._ratings
    }

    get comprehensiveOffers() {
        return this._comprehensiveOffers
    }

    get basket() {
        return this._basket
    }

    get favourite() {
        return this._favourite
    }


    get page() {
        return this._page
    }


    get limit() {
        return this._limit
    }

    get selectedBrandId() {
        return this._selectedBrandId
    }

    get selectedCategoryId() {
        return this._selectedCategoryId
    }

    get selectedTypeId() {
        return this._selectedTypeId
    }

    get minPrice() {
        return this._minPrice
    }

    get maxPrice() {
        return this._maxPrice
    }

    get name() {
        return this._name
    }

    get orderBy() {
        return this._orderBy
    }

    get isPromotion() {
        return this._isPromotion
    }
}