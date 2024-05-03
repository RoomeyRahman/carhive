import { OmitType } from '@nestjs/swagger';
import { IType } from '../interfaces';
import { TypeDto } from './type.dto';

export class UpdateTypeDto
    extends OmitType(TypeDto, [
        'cTime',
        'cBy',
        'uTime',
        'uBy'
    ] as const)
    implements Readonly<UpdateTypeDto> {
    constructor(data?: IType) {
        super(data);
    }
}
