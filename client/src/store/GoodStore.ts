import { makeAutoObservable } from "mobx";
import { GoodOrderBy, IBaseTable, IGetAllJSON, IGoodToUser, IUniversalTable } from "./index.js";
import { IRating } from "./RatingStore";


export interface ICategoryTable extends IBaseTable {
    name: string;
    image: string;
}
export interface IGoodJSON extends IGoodTable {
    ratings: IRating[];
    category: ICategoryTable | null;
    type: IType | null;
    brand: IUniversalTable | null;
}
export interface IGoodTable extends IBaseTable {
    name: string;
    price: number;
    oldPrice?: number | null;
    isPromotion?: boolean | null;
    categoryId?: number | null;
    typeId?: number | null;
    brandId?: number | null;
    good_images?: IUniversalTable[];
    good_infos?: IGoodInfo[];
}
export interface IGoodInfo extends IBaseTable {
    name: string;
    description: string;
    goodId: number;
}

export interface IType extends IBaseTable {
    name: string;
    categoryId: number;
}

export interface ICategoryJSON extends ICategoryTable {
    types?: IUniversalTable[];
}




export interface IGoodGetParams {
    page?: number;
    limit?: number;
    selectedCategoryId?: number;
    selectedTypeId?: number;
    selectedBrandId?: number;
    minPrice?: number;
    maxPrice?: number;
    name?: string;
    orderBy?: GoodOrderBy
    isPromotion?: boolean;
}

export class GoodStore {
    private _categories: IGetAllJSON<ICategoryJSON> | null = null;
    private _types: IGetAllJSON<IType> | null = null;
    private _goods: IGetAllJSON<IGoodJSON> | null = null;

    private _defaultGoodGetParameters: IGoodGetParams = {
        page: 1,
        limit: 10,
        selectedBrandId: undefined,
        selectedCategoryId: undefined,
        selectedTypeId: undefined,
        minPrice: 1,
        maxPrice: 9999999,
        name: '',
        orderBy: GoodOrderBy.id,
        isPromotion: undefined
    }
    // Параметры для запроса товаров
    private _goodGetParameters: IGoodGetParams = this.defaultGoodGetParameters

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setCategories(categories: IGetAllJSON<ICategoryJSON>) {
        this._categories = categories
    }
    setTypes(types: IGetAllJSON<IType>) {
        this._types = types
    }

    setGoods(goods: IGetAllJSON<IGoodJSON>) {
        this._goods = goods
    }



    setGoodGetParameters(params: IGoodGetParams) {
        this._goodGetParameters = {
            page: params.page,
            limit: params.limit,
            selectedBrandId: params.selectedBrandId,
            selectedCategoryId: params.selectedCategoryId,
            selectedTypeId: params.selectedTypeId,
            minPrice: params.maxPrice,
            maxPrice: params.maxPrice,
            name: params.name,
            orderBy: params.orderBy,
            isPromotion: params.isPromotion
        }
    }
    setPage(page: number) {
        this._goodGetParameters.page = page
    }

    setLimit(limit: number) {
        this.setPage(1)
        this._goodGetParameters.limit = limit
    }
    setSelectedCategoryId(selectedCategoryId: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.selectedCategoryId = selectedCategoryId
    }
    setSelectedTypeId(selectedTypeId: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.selectedTypeId = selectedTypeId
    }
    setSelectedBrandId(selectedBrandId: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.selectedBrandId = selectedBrandId
    }
    setMinPrice(minPrice: number) {
        this.setPage(1)
        this._goodGetParameters.minPrice = minPrice
    }
    setMaxPrice(maxPrice: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.maxPrice = maxPrice
    }
    setName(name: string) {
        this.setPage(1)
        this._goodGetParameters.name = name
    }
    setOrderBy(orderBy: GoodOrderBy) {
        this.setPage(1)
        this._goodGetParameters.orderBy = orderBy
    }
    setIsPromotion(isPromotion: boolean | undefined) {
        this.setPage(1)
        this._goodGetParameters.isPromotion = isPromotion
    }
    dropFields() {
        this._goodGetParameters = this.defaultGoodGetParameters;
    }

    get categories() { return this._categories; }

    get types() { return this._types }

    get goods() { return this._goods }



    get goodGetParameters() { return this._goodGetParameters }

    get page() { return this._goodGetParameters.page }

    get limit() { return this._goodGetParameters.limit }

    get selectedBrandId() { return this._goodGetParameters.selectedBrandId }

    get selectedCategoryId() { return this._goodGetParameters.selectedCategoryId }

    get selectedTypeId() { return this._goodGetParameters.selectedTypeId }
    
    get minPrice() { return this._goodGetParameters.minPrice }
    
    get maxPrice() { return this._goodGetParameters.maxPrice }
    
    get name() { return this._goodGetParameters.name }
    
    get orderBy() { return this._goodGetParameters.orderBy }
    
    get isPromotion() { return this._goodGetParameters.isPromotion }
    
    get defaultGoodGetParameters() { return this._defaultGoodGetParameters }
    
}