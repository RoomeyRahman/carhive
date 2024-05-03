import { OmitType } from '@nestjs/swagger';
import { IType } from '../interfaces';
import { TypeDto } from './type.dto';

export class CreateTypeDto
    extends OmitType(TypeDto, [
        'isActive',
        'isDeleted',
        'cTime',
        'cBy',
        'uTime',
        'uBy'
    ] as const)
    implements Readonly<CreateTypeDto> {
    constructor(data?: IType) {
        super(data);
    }
}
