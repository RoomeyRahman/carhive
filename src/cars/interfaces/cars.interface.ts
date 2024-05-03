import { IBase, IMedia, IPaginate } from '../../common/interfaces';

export interface ICar extends IBase {
    readonly _id?: string;
    readonly carId?: string;
    readonly owner?: string;
    readonly type?: string;
    readonly brand?: string;
    readonly name?: string;
    readonly slug?: string;
    readonly make?: string;
    readonly model?: string;
    readonly year?: number;
    readonly color?: string;
    readonly mileage?: number;
    readonly transmission?: string;
    readonly fuelType?: string;
    readonly numberOfSeats?: number;
    readonly rentPerDayPrice?: number;
    readonly priceCurrency?: string;
    readonly features?: string[];
    readonly additionalRules?: string;
    readonly thumbnail?: IMedia;
    readonly images?: IMedia[];
    readonly videos?: IMedia[];
    readonly viewCount?: number;
    readonly ratings?: number;
}

export interface ICars extends IPaginate {
    data: ICar[];
}
