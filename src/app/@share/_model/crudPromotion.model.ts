export class promotionObj {
    voucher: promotionDetail[];
    percent: string;

    constructor(params = {} as promotionObj) {
        this.percent = params.percent;
        this.voucher = params.voucher;
    }

}

export class promotionDetail {
    code: string;
    company: string;

    constructor(params = {} as promotionDetail) {
        this.code = params.code;
        this.company = params.company;
    }
}