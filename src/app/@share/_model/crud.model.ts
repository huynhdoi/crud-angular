import { promotionObj } from "./crudPromotion.model";

export enum CRUD_FE_BE_MAPPING_FIELD {
    id = 'id',
    foodName = 'food',
    foodCategory = 'foodCategory',
    amount = 'amount',
    madeIn = 'madeIn',
    promotionTable = 'promotion'
}

export interface ConvertToReqBodyCRUD {
    [CRUD_FE_BE_MAPPING_FIELD.id]: number;
    [CRUD_FE_BE_MAPPING_FIELD.foodName]: string;
    [CRUD_FE_BE_MAPPING_FIELD.foodCategory]: string;
    [CRUD_FE_BE_MAPPING_FIELD.amount]: number;
    [CRUD_FE_BE_MAPPING_FIELD.madeIn]: string;
    [CRUD_FE_BE_MAPPING_FIELD.promotionTable]: promotionObj[];
}

export class CRUD {
    id!: number;
    foodName!: string;
    foodCategory!: string;
    amount!: number;
    madeIn!: string;
    promotionTable!:promotionObj[];

    constructor(params = {} as CRUD, isParsedOrConvert: boolean = true) {
        if (isParsedOrConvert) { // default
            this.parseFromResp(params);
        } else {
            this.id = params.id;
            this.foodName = params.foodName;
            this.foodCategory = params.foodCategory;
            this.amount = params.amount;
            this.madeIn = params.madeIn;
            this.promotionTable=params.promotionTable;
        }
    }

    private parseFromResp(respObject: any = {}) {
        this.id = respObject.id;
        this.foodName = respObject[CRUD_FE_BE_MAPPING_FIELD['foodName']];
        this.foodCategory = respObject[CRUD_FE_BE_MAPPING_FIELD['foodCategory']];
        this.amount = respObject[CRUD_FE_BE_MAPPING_FIELD['amount']];
        this.madeIn = respObject[CRUD_FE_BE_MAPPING_FIELD['madeIn']];
        this.promotionTable = respObject[CRUD_FE_BE_MAPPING_FIELD['promotionTable']]
        return this;
    }

    public convertToReqBodyCRUD() {
        const body = new Object({}) as ConvertToReqBodyCRUD;
        this.id && (body[CRUD_FE_BE_MAPPING_FIELD['id']] = this.id);

        body[CRUD_FE_BE_MAPPING_FIELD['foodName']] = this.foodName;
        body[CRUD_FE_BE_MAPPING_FIELD['foodCategory']] = this.foodCategory;
        body[CRUD_FE_BE_MAPPING_FIELD['amount']] = this.amount;
        body[CRUD_FE_BE_MAPPING_FIELD['madeIn']] = this.madeIn;
        body[CRUD_FE_BE_MAPPING_FIELD['promotionTable']] = this.promotionTable;
        return body;
    }

}
