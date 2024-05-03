import { IBase, IMedia, IPaginate } from '../../common/interfaces';

export interface IType extends IBase {
    readonly _id?: string;
    readonly name?: string;
    readonly image?: IMedia;
}

export interface ITypes extends IPaginate {
    data: IType[];
}

